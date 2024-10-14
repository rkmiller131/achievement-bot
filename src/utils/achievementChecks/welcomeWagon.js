const { getUserDocument } = require('../collections/server.collection');
const findAndGiveAchievement = require('../findAndGiveAchievement');

async function checkWelcomeWagon(message, guildId, userId) {
  const messageIsReply = message.type === 19;
  const noMessageContent = message.content === '';
  const messageIsSticker = message.stickers.size > 0;

  if (messageIsReply && noMessageContent && messageIsSticker) {
    const { user, server } = await getUserDocument(guildId, userId);

    if (user.wavesGiven === 9) {
      await findAndGiveAchievement('Welcome Wagon', user, message, guildId, userId);
    } else if (user.wavesGiven < 10) {
      user.wavesGiven++;
      await server.save();
    }
    return true;
  }

  return false;
}

module.exports = checkWelcomeWagon;