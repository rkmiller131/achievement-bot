const findAndGiveAchievement = require('../findAndGiveAchievement');
const { getUserDocument } = require('../collections/server.collection');

module.exports = async function checkOratoryOverlord(channel, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  const message = { channel };

  // 360000 seconds is 100 hours
  if (user.voiceState.joinDuration < 360000) return;

  await findAndGiveAchievement('Oratory Overlord', user, message, guildId, userId);
}