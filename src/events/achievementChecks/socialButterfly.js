const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { getUserDocument } = require('../../utils/server.collection');

module.exports = async function checkSocialButterfly(message, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  if (user.channelsParticipatedIn.size !== 5) return;

  await findAndGiveAchievement('Social Butterfly', user, message, guildId, userId);
}