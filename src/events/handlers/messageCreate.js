const {
  getUserDocument,
  updateUserChannels,
  updateUserDocument,
  userHasAchievement
} = require('../../utils/server.collection');
const { Server } = require('../../database/schema');
const checkFirstImpressions = require('../achievementChecks/firstImpressions');
const checkSocialButterfly = require('../achievementChecks/socialButterfly');

// listen for when any message is posted anywhere
async function messageCreateHandler(message) {
  if(message.author.bot) return;

  // Try to find the server in the mongo collection, and if it doesn't exist, create an entry for that server.
  const guildId = message.guildId;
  const channelId = message.channelId;
  const channelName = message.channel.name;
  const userId = message.author.id;
  const userName = message.author.globalName;
  // Check if the message author exists in our database and save reference to user
  // const server = await getServer(guildId);
  // const user = server.users.find((u) => u.userId === userId);
  const user = await getUserDocument(guildId, userId);

  // FIRST IMPRESSIONS ACHIEVEMENT
  if (!user) {
    // then this is the user's first post. Give them first impressions achievement and update our user variable:
    await checkFirstImpressions(message, guildId, userId);
  }

  // Set the User's reaction streak to 0
  // (if they sent a message, this breaks their Introvert achievement streak)
  // const findUserFilter = { 'server.guildId': guildId, 'server.users.userId': userId };
  const reactionUpdate = {
    $set: {
      'server.users.$[user].reactionStreak': 0
    }
  };
  // updateOne is atomic, but save is generally preferred according to mongoose docs. You can even save down to the
  // user level rather than server.save, especially if only something small has changed. UPDATE: Mongoose does not save subdocs to the db.
  // user.reactionStreak = 0;
  // await server.save();
  // await Server.findOneAndUpdate(findUserFilter, reactionUpdate, { arrayFilters: ['user.userId', userId], new: true });
  await updateUserDocument(guildId, userId, reactionUpdate);

  // Update the user's participation count for this channel
  await updateUserChannels(message, guildId, userId);

  // SOCIAL BUTTERFLY ACHIEVEMENT
  await checkSocialButterfly(message, user, userId, guildId);

  // JABBERWOCKY ACHIEVEMENT
  // check if 100 messages have been sent in this particular text channel by this user
  // make sure they don't already have this achievement
  // generate their achievement


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

// listen for when any message is posted anywhere
  // First, extract the server id from the message in question, save as a ref so that we're saving all info under that server in the collection
  // Try to find the server in the mongo collection, and if it doesn't exist, create an entry for that server.

  // Check if the message author exists in our database and save reference to user and channel (?)
  // If !user:
    // add them to the database, give them First Impressions achievement
    // Increment the user's achievement count

  // set user's reaction streak to 0

  // Check the user's channels_particpated_in array - if not includes current channel name,
    // add channel name to this user's participated channels array
    // if the user's participated channels array length is >= 5,
      // Give this user the Social Butterfly achievement
      // Increment the user's achievment count

  // Check what time the message was posted - between 12AM and 4AM?
    // give this user the Overachiever/night owl achievement
    // Increment the user's acheivement count


  // Put this check at the end of every event:
  // If this user's achievment count is (count of the achievments table - 1)
    // Give this user the Final Boss achievement
    // Increment the user's achievment count



/*
[ ] First Impressions
[ ] Gif Gifter
[ ] Social Butterfly
[ ] Jabberwocky
[ ] Art Aficionado
[ ] Overachiever
[ ] Final Boss

[ ] Welcome Wagon
[ ] Senpai Noticed
[ ] Reaction Rockstar
[ ] Introvert
[ ] Final Boss

[ ] Voice Channel Veteran
[ ] Frequent Flyer
[ ] Final Boss

[ ] Daily Diligence
[ ] Top Contributor
[ ] Final Boss
*/