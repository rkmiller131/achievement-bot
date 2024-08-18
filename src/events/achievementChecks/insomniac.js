const isTimestampInWindow = require('../../utils/isTimestampInWindow');
const { getUserDocument, userHasAchievement, giveUserAchievement } = require('../../utils/server.collection');
const { findAchievement, generateAchievement } = require('../../utils/achievement.collection');
const { MENTION_STRING } = require('../../utils/constants');

module.exports = async function checkInsomniac(message, guildId, userId) {
  const isAnInsomniac = isTimestampInWindow(message.createdTimestamp, 2, 4);
  if (!isAnInsomniac) return;
  const { user } = await getUserDocument(guildId, userId);

  try {
    const insomniac = await findAchievement('Insomniac');
    const userAlreadyHas = await userHasAchievement(insomniac, user, guildId);
    if (userAlreadyHas) return;

    const achievementEmbed = generateAchievement(insomniac);
    const achievementRef = {
      achievement_id: insomniac._id,
      points: insomniac.points,
      date_acquired: Date.now()
    }

    await giveUserAchievement(achievementRef, guildId, userId);
    message.channel.send({ embeds: [achievementEmbed], content: MENTION_STRING(userId) });

  } catch (error) {
    console.error('Error in saving Insomniac achievement for this user: ', error);
    message.channel.send('An error occurred in unlocking the Insomniac achievement :(');
  }
}