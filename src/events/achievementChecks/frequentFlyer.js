const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { getUserDocument } = require('../../utils/server.collection');

module.exports = async function checkFrequentFlyer(channel, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  const message = { channel };

  if (user.voiceState.joinEvents !== 100) return;

  await findAndGiveAchievement('Frequent Flyer', user, message, guildId, userId);
}