const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { getUserDocument, updateUserChannels } = require('../../utils/server.collection');

module.exports = async function checkArtAficionado(message, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  const channelName = message.channel.name;

  if (user.channelsParticipatedIn.get(channelName) !== 10) return;

  await findAndGiveAchievement('Art Aficionado', user, message, guildId, userId);
}