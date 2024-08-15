const { MENTION_STRING } = require('../../utils/constants');
const { Server } = require('../../database/schema');
const { generateAchievement, findAchievement } = require('../../utils/achievement.collection');
const { userHasAchievement } = require('../../utils/server.collection');

module.exports = async function checkSocialButterfly(message, user, userId, guildId) {
  if (user.channelsParticipatedIn.size < 2) return;
  try {
    const socialButterfly = await findAchievement('Social Butterfly');
    if (await userHasAchievement(socialButterfly, user, guildId)) return;

    const achievementEmbed = generateAchievement(socialButterfly);

    const findUserFilter = { 'server.guildId': guildId, 'server.users.userId': userId };
    const andUpdate = {
      $push: {
        'server.users.$.achievements': { // first element in users array that matches achievements; only the achivements arr of the first user will be affected
          achievement_id: socialButterfly._id,
          date_acquired: Date.now()
        }
      }
    }
    await Server.findOneAndUpdate(findUserFilter, andUpdate, { new: true });
    message.channel.send({ embeds: [achievementEmbed], content: MENTION_STRING(userId) });

  } catch (error) {
    console.error('Error in saving Social Butterfly achievement for this user: ', error);
    message.channel.send('An error occurred in unlocking the Social Butterfly achievement :(');
  }
}