const { getUserDocument } = require('../../utils/server.collection');
const { countPossibleAchievements } = require('../../utils/achievement.collection');

module.exports = async function checkFinalBoss(guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  const achieved = user.achievements.length;
  const possible = await countPossibleAchievements() - 1;

  if ((achieved / possible) === 1 && achieved >= 0 && possible > 0) {
    return true;
  }
  return false;
}