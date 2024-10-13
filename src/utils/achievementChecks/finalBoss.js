const { getUserDocument } = require('../collections/server.collection');
const { countPossibleAchievements } = require('../collections/achievement.collection');
const findAndGiveAchievement = require('../findAndGiveAchievement');

module.exports = async function checkFinalBoss(message, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  const achieved = user.achievements.length;
  const possible = await countPossibleAchievements() - 1;

  if ((achieved / possible) === 1 && achieved >= 0 && possible > 0) {
    await findAndGiveAchievement('Final Boss', user, message, guildId, userId);
  }
}