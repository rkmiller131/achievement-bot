const {
  createNewUser,
  getUserDocument,
  logChannelActivity,
  resetReactionStreak,
  updateUserChannels,
} = require('../../utils/collections/server.collection');
const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const {
  checkWelcomeWagon,
  checkFirstImpressions,
  checkSocialButterfly,
  checkJabberwocky,
  checkInsomniac,
  checkGifGifter,
  checkArtAficionado,
  checkFinalBoss
} = require('../../utils/achievementChecks');
const { monthlyCron } = require('../cron/monthly');

let cronRunning = false;

async function messageCreateHandler(message) {
  if(message.author.bot || message.type === 7) return;

  const guildId = message.guildId;
  const channelName = message.channel.name;
  const userId = message.author.id;
  const { user } = await getUserDocument(guildId, userId);

  if (!user) {
    const userName = message.author.globalName;
    await createNewUser(guildId, userId, userName);
  }

  const welcomeReply = await checkWelcomeWagon(message, guildId, userId);
  if (welcomeReply) return;

  await logChannelActivity(message, guildId, userId);
  if (!cronRunning) {
    cronRunning = await monthlyCron(message, guildId);
    console.log('cron running? ', cronRunning)
  }

  const firstAchievement = await checkFirstImpressions(message, guildId, userId);

  await updateUserChannels(message, guildId, userId);
  if (cronRunning && firstAchievement) return;

  await resetReactionStreak(guildId, userId);

  await checkSocialButterfly(message, guildId, userId);
  await checkJabberwocky(message, guildId, userId);
  await checkInsomniac(message, guildId, userId);
  await checkGifGifter(message, guildId, userId);
  await checkArtAficionado(message, guildId, userId);
  await checkFinalBoss(message, guildId, userId);
}

module.exports = {
  messageCreateHandler,
}