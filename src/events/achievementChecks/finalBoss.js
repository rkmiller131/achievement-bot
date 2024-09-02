const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { getUserDocument } = require('../../utils/server.collection');
const { countPossibleAchievements } = require('../../utils/achievement.collection');

module.exports = async function checkFinalBoss(guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  const achieved = user.achievements.length;
  const possible = await countPossibleAchievements() - 1;

  if ((achieved / possible) !== 1 || achieved <= 0 || possible <= 0) return;

  // try {
  //   const achievement = await findAchievement('Final Boss');
  //   const userAlreadyHas = await userHasAchievement(achievement, user, guildId);
  //   if (userAlreadyHas) return;

  //   const achievementRef = {
  //     achievement_id: achievement._id,
  //     points: achievement.points,
  //     date_acquired: Date.now()
  //   }

  //   await giveUserAchievement(achievementRef, guildId, userId);

  //   // check if the server has a channel named general. If not, don't send any notifications. If it does, go ahead and generate the embed.
  //  because we don't have access to the message or channel name, use a webhook to send a message to a specific channel
  //   const achievementEmbed = generateAchievement(achievement);
  //   message.channel.send({ embeds: [achievementEmbed], content: MENTION_STRING(userId) });

  // } catch (error) {
  //   console.error(`Error in saving "${achievementName}" achievement for this user: `, error);
  //   message.channel.send(`An error occurred in unlocking the "${achievementName}" achievement :(`);
  // }
}