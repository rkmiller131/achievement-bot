const { Server } = require('../database/schema');
const mongoose = require('mongoose');
const isMessageArtRelated = require('./isMessageArtRelated');

// ---------------------------------------------------------------------------------

async function createNewUser(guildId, userId, userName) {
  const server = await getServer(guildId);
  try {
    server.users.push({
      userId,
      globalName: userName,
      channelsParticipatedIn: {},
      achievements: [],
      voiceState: {}
    });
    await server.save();

  } catch (error) {
    console.error('Error creating new user:', error);
    throw error;
  }
}

// ---------------------------------------------------------------------------------

async function getServer(guildId) {
  try {
    const serverExists = await Server.findOne({ guildId }).exec();
    if (!serverExists) {
      const server = await Server.create({ guildId });
      return server;
    }
    return serverExists;
  } catch (error) {
    console.error('Error saving Server ID:', error);
    throw error;
  }
}

// ---------------------------------------------------------------------------------

async function getTop5Users(guildId) {
  try {
    const results = await Server.aggregate()
    .match({ guildId }) // find the correct server document for this guild
    .unwind('$users') // now instead of server being the doc and server.users being an [], each user is its own document like: users.(userId, globalName, achievments, etc.) - these are now split into an array of objects for each user
    .project({ // https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/
      userId: '$users.userId', // create fields you want to pass along, name them however you want
      globalName: "$users.globalName",
      achievements: { // you can even perform more actions on the fields, such as mapping (transforming the achievements array)
        $map: { // https://www.mongodb.com/docs/manual/reference/operator/aggregation/map/
          input: '$users.achievements', // map over this array
          as: 'achievement', // and for each achievement,
          in: {
            points: '$$achievement.points' // create a new object with only the points field (flattens array). Double $$ is specific to the requirements of mongo map syntax
          }
        }
      },
      achievementCount: { $size: '$users.achievements' } // a new field passed onto the next pipeline fn that counts length of achievement array
    })
    .unwind('achievements') // unwind the projected achievements field
    .group({ // group these accumulator objects (the keys will be what you see in the final result) - accumulator objects = fields that will be accumulated across all documents
      _id: '$userId',
      globalName: { $first: '$globalName' }, // using $first in the grouping stage allows you to preserve the first document meaning it doesn't accumulate that property across all documents
      totalPoints: { $sum: '$achievements.points' },
      achievementCount: { $first: '$achievementCount' }
    })
    .sort({ totalPoints: -1 })
    .limit(5);

    return results;

  } catch (error) {
    console.error('Error getting top 5 users:', error);
    throw new Error('Error getting top 5 users:', error);
  }
}

// ---------------------------------------------------------------------------------

async function getUserDocument(guildId, userId) {
  const server = await getServer(guildId);
  const user = server.users.find((u) => u.userId === userId);
  return { user, server };
}

// ---------------------------------------------------------------------------------

async function giveUserAchievement(achievementRef, guildId, userId) {
  try {
    await Server.findOneAndUpdate(
      { 'guildId': guildId },
      { $push: {
          'users.$[user].achievements': achievementRef
      }},
      { arrayFilters: [{ 'user.userId': userId }]}
    );
  } catch (error) {
    console.error(`Achievement failed to push into user achievements`);
    throw error;
  }
}

// ---------------------------------------------------------------------------------

async function resetReactionStreak(guildId, userId) {
  await Server.findOneAndUpdate(
    { 'guildId': guildId },
    { $set: {
        'users.$[user].reactionStreak': 0
    }}, //         ^-----v
    { arrayFilters: [{ 'user.userId': userId }] }
  );
}

// ---------------------------------------------------------------------------------

async function updateReactionStreak(guildId, userId) {
  await Server.findOneAndUpdate(
    { 'guildId': guildId },
    { $inc: {
        'users.$[user].reactionStreak': 1
    }},
    { arrayFilters: [{ 'user.userId': userId }] }
  );
}

// ---------------------------------------------------------------------------------

async function updateUserChannels(message, guildId, userId) {
  const artRelatedChannel = isMessageArtRelated(message);

  // create two separate channels for art - one for text participation and one for attachments (for art aficionado achievement tracking)
  const channelName = artRelatedChannel === 'art-text-only' ? artRelatedChannel : message.channel.name;
  const { user, server } = await getUserDocument(guildId, userId);

  if (!user.channelsParticipatedIn.has(channelName)) {
    // Add channel name to this user's participated channels map with a count of 1
    user.channelsParticipatedIn.set(channelName, 1);
  } else {
    // Increment the count for the current channel name
    user.channelsParticipatedIn.set(channelName, user.channelsParticipatedIn.get(channelName) + 1);
  }

  try {
    await server.save();
  } catch (error) {
    console.error('Failed to save user document: ', error);
    throw error;
  }
}

// ---------------------------------------------------------------------------------

async function updateUserVoiceState(guildId, userId, joinTimestamp, leaveTimestamp) {
  if (joinTimestamp && !leaveTimestamp) {
    // update user voice join event (increment join events, update lastjoin timestamp)
    try {
      await Server.findOneAndUpdate(
        { 'guildId': guildId },
        {
          $inc: { 'users.$[user].voiceState.joinEvents': 1 },
          $set: { 'users.$[user].voiceState.lastJoinTimestamp': joinTimestamp }
        },
        { arrayFilters: [{ 'user.userId': userId }], upsert: true }
      );
    } catch (error) {
      console.error('Error updating voice state join event:', error);
    }
  }

  if (leaveTimestamp) {
    // using the user's lastJoinTimestamp calc the difference in leaveTimestamp argument divided by 1000
    // and increment join duration (which will now be in seconds).
    const { user, server } = await getUserDocument(guildId, userId);
    if (user.voiceState.joinDuration > 360000) return; // Don't keep tracking if achievment already given

    const lastJoinTimestamp = user.voiceState.lastJoinTimestamp;
    if (!lastJoinTimestamp) return;

    const maxSafeIntValue = 2147483647; // just in case something crazy happens, don't store more than int val
    const newDuration = Math.min(
      (Math.floor(
        (Math.abs(leaveTimestamp - lastJoinTimestamp)) / 1000 // < to get duration in seconds
      )),
      maxSafeIntValue
    )
    try {
      await Server.findOneAndUpdate(
        { 'guildId': guildId },
        { $inc: { 'users.$[user].voiceState.joinDuration': newDuration } },
        { arrayFilters: [{ 'user.userId': userId }], upsert: true }
      )
    } catch (error) {
      console.error('Error updating user voice state leave event:', error);
    }
  }
}

// ---------------------------------------------------------------------------------

async function userHasAchievement(achievement, user, guildId) {
  try {
    const result = await Server.aggregate()
      .match({ guildId }) // find only docs that match the guildId
      .unwind('$users') // deconstruct users array, map each output with element value
      .match({ 'users.userId': user.userId }) // now match that new element value for the given userId
      .project({ // passes along the documents with requested fields to the next stage in pipeline
        // after an unwind, the resulting document replaces the array with an element value.
        // so instead of users.userId.achievements, we now have users: { userId: 123, achievements: {...etc} }
        // see what I mean by commenting out everything below project and console logging result
        achievements: '$users.achievements'
      })
      .match({ achievements: {
        $elemMatch: {
          achievement_id: new mongoose.Types.ObjectId(achievement._id)
        }
      }});

    // Check if the result array is empty or not, returns true or false
    return result.length > 0;
  } catch (error) {
    console.error('Error checking user achievement:', error);
    return false;
  }
}


module.exports = {
  createNewUser,
  getServer,
  getTop5Users,
  getUserDocument,
  giveUserAchievement,
  resetReactionStreak,
  updateReactionStreak,
  updateUserChannels,
  updateUserVoiceState,
  userHasAchievement,
}