const findAndGiveAchievement = require('../findAndGiveAchievement');
const isMessageArtRelated = require('../isMessageArtRelated');
const { getUserDocument } = require('../collections/server.collection');

module.exports = async function checkArtAficionado(message, guildId, userId) {
  const artRelatedChannel = isMessageArtRelated(message);
  if (artRelatedChannel !== true) return; // channel is art related AND has an attachement if true

  const { user } = await getUserDocument(guildId, userId);
  const channelName = message.channel.name;

  if (user.channelsParticipatedIn.get(channelName) !== 10) return;

  await findAndGiveAchievement('Art Aficionado', user, message, guildId, userId);
}