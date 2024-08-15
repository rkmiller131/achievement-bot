const { Server } = require('../database/schema');

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

async function getUserDocument(guildId, serverId) {
  const server = await getServer(guildId);
  const user = server.users.find((u) => u.userId === userId);
  return user;
}

async function updateUserChannels(message, user, server) {
  const channelName = message.channel.name;

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

async function updateUserDocument(guildId, userId, updateQuery) {
  const findUserFilter = { 'server.guildId': guildId, 'server.users.userId': userId };
  const updatedUser = await Server.findOneAndUpdate(findUserFilter, updateQuery, { new: true });
  return updatedUser;
}

async function userHasAchievement(achievement, user, guildId) {
  try {
    // const result = await Server.aggregate([
    //   {
    //     $match: { guildId: guildId } // find only docs that match the guildId
    //   },
    //   {
    //     $unwind: "$users" // deconstruct users array, map each output with element value
    //   },
    //   {
    //     $match: { "users.userId": user.userId } // now match that new element value for the given userId
    //   },
    //   {
    //     $project: { // create a new true/false field called hasAchievement
    //       hasAchievement: {
    //         $elemMatch: { // return true if we match the achievement id, false otherwise
    //           achievement_id: achievement._id
    //         }
    //       }
    //     }
    //   }
    // ]);

    const result = await Server.aggregate()
      .match({ guildId }) // find only docs that match the guildId
      .unwind('$users') // deconstruct users array, map each output with element value
      .match({ 'users.userId': user.userId }) // now match that new element value for the given userId
      .project({ // create a new true/false field called hasAchievement
        hasAchievement: {
          $elemMatch: { // return true if we match the achievement id, false otherwise
            achievement_id: achievement._id
          }
        }
      });

    // Check if the result array is empty or not, returns true or false
    return result.length > 0 && result[0].hasAchievement !== null;
  } catch (error) {
    console.error('Error checking user achievement:', error);
    return false;
  }
}


module.exports = {
  getServer,
  getUserDocument,
  updateUserChannels,
  updateUserDocument,
  userHasAchievement,
}