const isTimestampInWindow = require('../../utils/isTimestampInWindow');
const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { getUserDocument } = require('../../utils/server.collection');

module.exports = async function checkInsomniac(message, guildId, userId) {
  const isAnInsomniac = isTimestampInWindow(message.createdTimestamp, 2, 4);
  if (!isAnInsomniac) return;

  const { user } = await getUserDocument(guildId, userId);
  await findAndGiveAchievement('Insomniac', user, message, guildId, userId);
}