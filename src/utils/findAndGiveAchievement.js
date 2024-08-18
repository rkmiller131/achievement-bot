const { MENTION_STRING } = require('./constants');
const { generateAchievement, findAchievement } = require('./achievement.collection');
const { giveUserAchievement, userHasAchievement } = require('./server.collection');

module.exports = async function findAndGiveAchievement(achievementName, user, message, guildId, userId) {
  try {
    const achievement = await findAchievement(achievementName);
    const userAlreadyHas = await userHasAchievement(achievement, user, guildId);
    if (userAlreadyHas) return;

    const achievementEmbed = generateAchievement(achievement);
    const achievementRef = {
      achievement_id: achievement._id,
      points: achievement.points,
      date_acquired: Date.now()
    }

    await giveUserAchievement(achievementRef, guildId, userId);
    message.channel.send({ embeds: [achievementEmbed], content: MENTION_STRING(userId) });

  } catch (error) {
    console.error(`Error in saving "${achievementName}" achievement for this user: `, error);
    message.channel.send(`An error occurred in unlocking the "${achievementName}" achievement :(`);
  }
}