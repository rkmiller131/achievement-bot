const findAndGiveAchievement = require('../findAndGiveAchievement');
const { getUserDocument } = require('../collections/server.collection');

module.exports = async function checkFrequentFlyer(channel, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  const message = { channel };

  if (user.voiceState.joinEvents !== 100) return;

  await findAndGiveAchievement('Frequent Flyer', user, message, guildId, userId);
}