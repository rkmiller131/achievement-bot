const {
  createNewUser,
  getUserDocument,
  resetReactionStreak,
  updateUserChannels,
} = require('../../utils/server.collection');
const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const checkFirstImpressions = require('../achievementChecks/firstImpressions');
const checkSocialButterfly = require('../achievementChecks/socialButterfly');
const checkJabberwocky = require('../achievementChecks/jabberwocky');
const checkInsomniac = require('../achievementChecks/insomniac');
const checkGifGifter = require('../achievementChecks/gifGifter');
const checkArtAficionado = require('../achievementChecks/artAficionado');
const checkFinalBoss = require('../achievementChecks/finalBoss');

async function messageCreateHandler(message) {
  // type 7 is a userJoin event - don't want to give first impression achievement
  // for an automated message generated when a user first accepts invite to server
  if(message.author.bot || message.type === 7) return;

  console.log('MESSAGE CREATE HANDLER ', message);

  // welcome wagon: if the message is message.type === 19 (a reply), message.content is '', and the message.stickers collection map has a size

  const guildId = message.guildId;
  const channelName = message.channel.name;
  const userId = message.author.id;
  const { user } = await getUserDocument(guildId, userId);

  if (!user) {
    const userName = message.author.globalName;
    await createNewUser(guildId, userId, userName);
  }

  const firstAchievement = await checkFirstImpressions(message, guildId, userId);

  // Update the user's participation count for this channel
  await updateUserChannels(message, guildId, userId);
  if (firstAchievement) return; // no need to check the rest

  // Set the User's reaction streak to 0
  // (if they sent a message, this breaks their Introvert achievement streak)
  await resetReactionStreak(guildId, userId);

  await checkSocialButterfly(message, guildId, userId);
  await checkJabberwocky(message, guildId, userId);
  await checkInsomniac(message, guildId, userId);
  await checkGifGifter(message, guildId, userId);
  await checkArtAficionado(message, guildId, userId);
  const gotFinalBoss = await checkFinalBoss(guildId, userId);

  if (gotFinalBoss) { // final boss is a bit different - need reference to either message or channel to send achievement and
    // that reference might not be present in all types of handlers (like for voice). Can refactor later if I'm wrong
    const { user } = await getUserDocument(guildId, userId);
    await findAndGiveAchievement('Final Boss', user, message, guildId, userId);
  }


  // UPDATE CHANNEL ACTIVITY
  // grab the channelId and store in server.channelActivity: server.channelActivity.channelId =
  // a merge of the array to include new entry obj (merge rather than push)

  // for the future, when a new member is added: GatewayIntentBits.GuildMembers and Events.guildMemberAdd
  // messageReactionAdd

}

module.exports = {
  messageCreateHandler,
}

/*
[ ] Welcome Wagon
[X] First Impressions
[X] Gif Gifter
[X] Social Butterfly
[X] Jabberwocky
[X] Art Aficionado
[X] Insomniac
[\] Final Boss

[ ] Senpai Noticed
[ ] Reaction Rockstar
[ ] Introvert
[ ] Final Boss

[ ] Oratory Overlord
[ ] Frequent Flyer
[ ] Final Boss

[ ] Daily Diligence
[ ] Top Contributor
[ ] Final Boss
*/