const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { getUserDocument } = require('../../utils/server.collection');

module.exports = async function checkGifGifter(message, guildId, userId) {
  const messageEmbeds = message.embeds;
  const { user, server } = await getUserDocument(guildId, userId);

  // while it seems unlikely that anyone would send more than one embed and would simplify the code,
  // the fact that discord puts embeds in an array grants the possibility that a user somehow *can
  // so iterate anyways instead of just message.embeds[0].data.type === 'gifv'
  messageEmbeds.forEach((embed) => {
    const isGif = embed.data.type === 'gifv';
    if (isGif) user.gifsSent++;
  });
  await server.save();

  // changing to !== to further improve efficiency. Only get an achivement once anyways
  if (user.gifsSent !== 20) return;
  await findAndGiveAchievement('GIF Gifter', user, message, guildId, userId);
}