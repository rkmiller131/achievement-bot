const {
  getUserDocument,
  getServer,
  updateReactionStreak
} = require('../../utils/server.collection');

async function messageReactionHandler(reaction) {
  console.log('reaction in reaction handler is ', reaction)
  if(reaction.message.author.bot) return;

  // this logged user is the user who reacted to this message
  // OR what we could do instead of a loop in a loop is just take the last user (the last reaction given)
  // make sure that the last user is not the same as the message author id (can't like your own posts)
  // reaction.message.reactions.cache.forEach((reaction) => {
  //   reaction.users.cache.forEach((user) => {
  //     console.log(user)
  //   })
  // })

  // Note - make a partials plugin in index.js so that rections can be viewed for past posts? I think it would be better not to do
  // partials and just have a disclaimer that achievement tracking won't go back in time - starts fresh upon being added to the server

  const guildId = reaction.message.guildId;
  const message = reaction.message; // so that we can send replies/embeds to message.channel
  const userId = reaction.message.author.id;
  const { user } = await getUserDocument(guildId, userId);

  if (!user) {
    const userName = reaction.message.author.globalName;
    const server = await getServer(guildId);
    server.users.push({
      userId,
      globalName: userName,
      channelsParticipatedIn: {},
      achievements: [],
      reactionStreak: 1
    });
    await server.save();
    return;
  }

  await updateReactionStreak(guildId, userId);

  // check both senpai noticed and reaction rockstar -

  // check introvert

  // check final boss

  // console.log('message is ', reaction);
}

module.exports = {
  messageReactionHandler,
}

/*
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

/*
message is  <ref *2> MessageReaction {
  message: <ref *1> Message {
    channelId: '1264924870425444448',
    guildId: '1264924870425444445',
    id: '1280562285374607471',
    createdTimestamp: 1725380240530,
    type: 0,
    system: false,
    content: 'test',
    author: User {
      id: '384151206559350784',
      bot: false,
      system: false,
      flags: [UserFlagsBitField],
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
    nonce: '1280562283885363200',
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
  },
  me: false,
  users: ReactionUserManager { reaction: [Circular *2] },
  _emoji: ReactionEmoji {
    animated: null,
    name: '🤞🏻',
    id: null,
    reaction: [Circular *2]
  },
  count: 1
}
*/