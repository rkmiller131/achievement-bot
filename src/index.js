require('dotenv').config();
const {
  Client,
  Collection,
  GatewayIntentBits,
  Events
} = require('discord.js');
const { clientReadyHandler } = require('./events/handlers/clientReady');
const { interactionCreateHandler } = require('./events/handlers/interactionCreate');
const { messageCreateHandler } = require('./events/handlers/messageCreate');
const { messageReactionHandler } = require('./events/handlers/messageReaction');
const { voiceStateHandler } = require('./events/handlers/voiceState');
const leaderboardCommand = require('./commands/leaderboard');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates
  ],
});

client.commands = new Collection();
client.commands.set(leaderboardCommand.data.name, leaderboardCommand);

client.once(Events.ClientReady, clientReadyHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);
client.on(Events.MessageCreate, messageCreateHandler);
client.on(Events.MessageReactionAdd, messageReactionHandler);
client.on(Events.VoiceStateUpdate, voiceStateHandler);

client.login();