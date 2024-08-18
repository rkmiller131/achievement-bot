const { MENTION_STRING } = require('../../utils/constants');
const { Server } = require('../../database/schema');
const { generateAchievement, findAchievement } = require('../../utils/achievement.collection');
const { getUserDocument, giveUserAchievement, userHasAchievement } = require('../../utils/server.collection');

module.exports = async function checkJabberwocky(message, guildId, userId) {
  const channelName = message.channel.name;
  const { user } = await getUserDocument(guildId, userId);
  if (user.channelsParticipatedIn.get(channelName) < 100) return;

  try {
    const jabberwocky = await findAchievement('Jabberwocky');
    const userAlreadyHas = await userHasAchievement(jabberwocky, user, guildId);
    if (userAlreadyHas) return;

    const achievementEmbed = generateAchievement(jabberwocky);
    const achievementRef = {
      achievement_id: jabberwocky._id,
      points: jabberwocky.points,
      date_acquired: Date.now()
    }

    await giveUserAchievement(achievementRef, guildId, userId);
    message.channel.send({ embeds: [achievementEmbed], content: MENTION_STRING(userId) });

  } catch (error) {
    console.error('Error in saving Jabberwocky achievement for this user: ', error);
    message.channel.send('An error occurred in unlocking the Jabberwocky achievement :(');
  }
}