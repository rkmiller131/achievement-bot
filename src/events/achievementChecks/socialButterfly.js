const { MENTION_STRING } = require('../../utils/constants');
const { Server } = require('../../database/schema');
const { generateAchievement, findAchievement } = require('../../utils/achievement.collection');
const { getUserDocument, giveUserAchievement, userHasAchievement } = require('../../utils/server.collection');

module.exports = async function checkSocialButterfly(message, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  if (user.channelsParticipatedIn.size < 5) return;

  try {
    const socialButterfly = await findAchievement('Social Butterfly');
    const userAlreadyHas = await userHasAchievement(socialButterfly, user, guildId);
    if (userAlreadyHas) return;

    const achievementEmbed = generateAchievement(socialButterfly);
    const achievementRef = {
      achievement_id: socialButterfly._id,
      date_acquired: Date.now()
    }

    await giveUserAchievement(achievementRef, guildId, userId);
    message.channel.send({ embeds: [achievementEmbed], content: MENTION_STRING(userId) });

  } catch (error) {
    console.error('Error in saving Social Butterfly achievement for this user: ', error);
    message.channel.send('An error occurred in unlocking the Social Butterfly achievement :(');
  }
}