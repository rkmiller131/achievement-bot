const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { getUserDocument } = require('../../utils/server.collection');

module.exports = async function checkIntrovert(message, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  if (user.reactionStreak !== 10) return;
  await findAndGiveAchievement('Introvert', user, message, guildId, userId);
}