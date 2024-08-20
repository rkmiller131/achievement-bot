const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { getUserDocument } = require('../../utils/server.collection');

module.exports = async function checkJabberwocky(message, guildId, userId) {
  const channelName = message.channel.name;
  const { user } = await getUserDocument(guildId, userId);
  if (user.channelsParticipatedIn.get(channelName) !== 100) return;

  await findAndGiveAchievement('Jabberwocky', user, message, guildId, userId);
}