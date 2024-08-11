const { getServer } = require('../../utils/server.collection');
const { generateAchievement } = require('../../utils/achievement.collection');
const { Server, Achievement } = require('../../database/schema');

const MENTION_STRING = `New Achievement <@${userId}>`;

// listen for when any message is posted anywhere
async function messageCreateHandler(message) {
  if(message.author.bot) return;

  // Try to find the server in the mongo collection, and if it doesn't exist, create an entry for that server.
  const server = await getServer(message.guildId);
  const channelId = message.channelId;
  const channelName = message.channel.name;
  const userId = message.author.id;
  const userName = message.author.globalName;

  // FIRST IMPRESSIONS ACHIEVEMENT
  try {
    // Check if the message author exists in our database and save reference to user and channel
    let user = server.users.find((u) => u.userId === userId);
    if (!user) {
      // then this is the user's first post. Give them first impressions achievement:
      const firstImpressions = await Achievement.findOne({ name: 'First Impressions' }).exec();
      if (!firstImpressions) {
        message.channel.send('The "First Impressions" achievement is not available at this time');
        return;
      }
      const achievementEmbed = generateAchievement(firstImpressions);
      // add them to the database, give them First Impressions achievement
      // update the user variable with this newly created user
      // update the users achievement list to include this achievement in one, atomized transaction
      server.users.push({
        userId,
        globalName: userName,
        channelsParticpatedIn: {},
        achievements: [{
          achievement_id: firstImpressions._id,
          date_acquired: Date.now()
        }]
      });
      await server.save();

      user = server.users[server.users.length - 1];
      message.channel.send({ embeds: [achievementEmbed], content: MENTION_STRING });
    }
  } catch (error) {
    console.error('Error in creating new user, First Impressions: ', error);
    message.channel.send('An error occurred in saving this user and their first post achievement :(');
  }


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