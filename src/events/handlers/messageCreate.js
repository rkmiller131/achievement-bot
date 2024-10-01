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
const { monthlyCron, PUBLIC_CHANNEL } = require('../cron/monthly');

let cronRunning = false;

async function messageCreateHandler(message) {
  // type 7 is a userJoin event - don't want to give first impression achievement
  // for an automated message generated when a user first accepts invite to server
  if(message.author.bot || message.type === 7) return; // <-also since we're not doing partials, we dont want to make a new user in our db off of just this event. (want to check at every interaction instead)

  const guildId = message.guildId;
  const channelName = message.channel.name;
  const userId = message.author.id;
  const { user } = await getUserDocument(guildId, userId);

  if (!user) {
    const userName = message.author.globalName;
    await createNewUser(guildId, userId, userName);
  }

  const welcomeReply = await checkWelcomeWagon(message, guildId, userId);
  // return after a true welcome wagon reply -
  // don't want to count it as a participation in the channel other than for this achievement
  if (welcomeReply) return;

  await logChannelActivity(message, guildId, userId);
  if (!cronRunning) {
    cronRunning = monthlyCron(message, guildId);
  }

  const firstAchievement = await checkFirstImpressions(message, guildId, userId);

  // Update the user's participation count for this channel
  await updateUserChannels(message, guildId, userId);
  if (cronRunning && firstAchievement) return; // no need to check the rest

  // Set the User's reaction streak to 0
  // (if they sent a message, this breaks their Introvert achievement streak)
  await resetReactionStreak(guildId, userId);

  await checkSocialButterfly(message, guildId, userId);
  await checkJabberwocky(message, guildId, userId);
  await checkInsomniac(message, guildId, userId);
  await checkGifGifter(message, guildId, userId);
  await checkArtAficionado(message, guildId, userId);

  if (!PUBLIC_CHANNEL) return;
  await checkFinalBoss(PUBLIC_CHANNEL, guildId, userId);
}

module.exports = {
  messageCreateHandler,
}

/*
[X] Welcome Wagon
[X] First Impressions
[X] Gif Gifter
[X] Social Butterfly
[X] Jabberwocky
[X] Art Aficionado
[X] Insomniac
[X] Final Boss <--revise after cron related achievements

[X] Senpai Noticed
[X] Reaction Rockstar
[X] Introvert
[ ] Final Boss

[X] Oratory Overlord
[X] Frequent Flyer
[ ] Final Boss

[ ] Daily Diligence
[X] Top Contributor
[ ] Final Boss
*/