const { getUserDocument, sumWeekdayActivityByUser } = require('../collections/server.collection');
const findAndGiveAchievement = require('../findAndGiveAchievement');
const { checkFinalBoss } = require('.');

module.exports = async function checkDailyDiligence(message, guildId, prevMonth, prevYear) {
  if (!message) {
    console.error('No public channel is established yet');
    return;
  }

  const achievers = await sumWeekdayActivityByUser(guildId, prevMonth, prevYear);
  console.log('achievers are ', achievers);

  achievers.forEach(async (achiever) => {
    const userId = achiever._id;
    const { user } = await getUserDocument(guildId, userId);
    await findAndGiveAchievement('Daily Diligence', user, message, guildId, userId)
    await checkFinalBoss(message, guildId, userId);
  })
}