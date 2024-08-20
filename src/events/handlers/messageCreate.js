const {
  getUserDocument,
  resetReactionStreak,
  updateUserChannels,
} = require('../../utils/server.collection');
const checkFirstImpressions = require('../achievementChecks/firstImpressions');
const checkSocialButterfly = require('../achievementChecks/socialButterfly');
const checkJabberwocky = require('../achievementChecks/jabberwocky');
const checkInsomniac = require('../achievementChecks/insomniac');
const checkGifGifter = require('../achievementChecks/gifGifter');

async function messageCreateHandler(message) {
  if(message.author.bot) return;

  const guildId = message.guildId;
  const channelName = message.channel.name;
  const userId = message.author.id;
  let { user } = await getUserDocument(guildId, userId);

  if (!user) {
    await checkFirstImpressions(message, guildId, userId);
  }

  // Set the User's reaction streak to 0
  // (if they sent a message, this breaks their Introvert achievement streak)
  await resetReactionStreak(guildId, userId);

  // Update the user's participation count for this channel
  await updateUserChannels(message, guildId, userId);

  await checkSocialButterfly(message, guildId, userId);
  await checkJabberwocky(message, guildId, userId);
  await checkInsomniac(message, guildId, userId);
  await checkGifGifter(message, guildId, userId);

  // ART AFICIONADO
  // if the channel name is anything that matches a regex of %art% (?) would this include something like 'apart'? maybe have a set of approved channel names: art, artistic, fan art, etc.
  //


  // channel name: message.channel.name (for 'art')
  // for gifs: check the message.embeds.data.type === 'gifv' or maybe 'gif'?
  // for attachements, see attatchment collection (size for how many), then message.attachments.forEach((attach) => do something with attach.url or even check attach.contentType to see if 'image/webp' or maybe gif here too)

}

module.exports = {
  messageCreateHandler,
}

/*
message is:  <ref *1> Message {
  channelId: '1264924870425444448',
  guildId: '1264924870425444445',
  id: '1270048397600231519',
  createdTimestamp: 1722873534346,
  type: 0,
  system: false,
  content: 'testing',
  author: User {
    id: '384151206559350784',
    bot: false,
    system: false,
    flags: UserFlagsBitField { bitfield: 0 },
    username: 'cometbloom',
    globalName: 'R/A\\CHEL',
    discriminator: '0',
    avatar: '6073928e18590f0f2a96c9ea5eb2ac28',
    banner: undefined,
    accentColor: undefined,
    avatarDecoration: null
  },
  pinned: false,
  tts: false,
  nonce: '1270048385235156992',
  embeds: [],
  components: [],
  attachments: Collection(0) [Map] {},
  stickers: Collection(0) [Map] {},
  position: null,
  roleSubscriptionData: null,
  resolved: null,
  editedTimestamp: null,
  reactions: ReactionManager { message: [Circular *1] },
  mentions: MessageMentions {
    everyone: false,
    users: Collection(0) [Map] {},
    roles: Collection(0) [Map] {},
    _members: null,
    _channels: null,
    _parsedUsers: null,
    crosspostedChannels: Collection(0) [Map] {},
    repliedUser: null
  },
  webhookId: null,
  groupActivityApplication: null,
  applicationId: null,
  activity: null,
  flags: MessageFlagsBitField { bitfield: 0 },
  reference: null,
  interaction: null,
  poll: null
}
*/


  // Put this check at the end of every event:
  // If this user's achievment count is (count of the achievments table - 1)
    // Give this user the Final Boss achievement
    // Increment the user's achievment count



/*
[X] First Impressions
[X] Gif Gifter
[X] Social Butterfly
[X] Jabberwocky
[ ] Art Aficionado
[X] Insomniac
[ ] Final Boss

[ ] Welcome Wagon
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