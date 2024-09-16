const { getUserDocument } = require('../collections/server.collection');
const findAndGiveAchievement = require('../findAndGiveAchievement');

module.exports = async function checkFirstImpressions(message, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  if (user.channelsParticipatedIn.size !== 0) return false;
  await findAndGiveAchievement('First Impressions', user, message, guildId, userId);
  return true;
}