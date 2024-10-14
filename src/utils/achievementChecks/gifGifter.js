const findAndGiveAchievement = require('../findAndGiveAchievement');
const { getUserDocument } = require('../collections/server.collection');

module.exports = async function checkGifGifter(message, guildId, userId) {
  const messageEmbeds = message.embeds;
  const { user, server } = await getUserDocument(guildId, userId);

  messageEmbeds.forEach((embed) => {
    const isGif = embed.data.type === 'gifv';
    if (isGif) user.gifsSent++;
  });
  await server.save();

  if (user.gifsSent !== 20) return;
  await findAndGiveAchievement('GIF Gifter', user, message, guildId, userId);
}