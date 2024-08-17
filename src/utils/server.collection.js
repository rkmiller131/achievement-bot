const { Server } = require('../database/schema');
const mongoose = require('mongoose');

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

async function updateUserChannels(message, guildId, userId) {
  const channelName = message.channel.name;
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
  getServer,
  getUserDocument,
  giveUserAchievement,
  resetReactionStreak,
  updateUserChannels,
  userHasAchievement,
}