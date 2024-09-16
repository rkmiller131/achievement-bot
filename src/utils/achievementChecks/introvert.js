const findAndGiveAchievement = require('../findAndGiveAchievement');
const { getUserDocument } = require('../collections/server.collection');

module.exports = async function checkIntrovert(message, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  if (user.reactionStreak !== 10) return;
  await findAndGiveAchievement('Introvert', user, message, guildId, userId);
}