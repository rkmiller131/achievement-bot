const { getUserDocument, sumChannelActivityByUser } = require('../collections/server.collection');
const findAndGiveAchievement = require('../findAndGiveAchievement');

module.exports = async function checkTopContributor(message, guildId, prevMonth, prevYear) {
  if (!message) {
    console.error('No public channel is established yet');
    return;
  }

  const topContributor = await sumChannelActivityByUser(guildId, prevMonth, prevYear);

  const userId = topContributor._id;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[topContributor.month];
  const customMention = (userId) => `<@${userId}>, you posted ${topContributor.count} times in ${month}!`;

  const { user } = await getUserDocument(guildId, userId);
  await findAndGiveAchievement('Top Contributor', user, message, guildId, userId, customMention);
  return userId;
}