const { MENTION_STRING } = require('../../utils/constants');
const { getUserDocument } = require('../../utils/server.collection');
const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');

module.exports = async function checkFirstImpressions(message, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  if (user.channelsParticipatedIn.size !== 0) return false;
  await findAndGiveAchievement('First Impressions', user, message, guildId, userId);
  return true;
}