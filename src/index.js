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

// Event Emitter Class (discord.js is OOP)
const client = new Client({
  // intents define which events discord sends to the bot.
  // Not only are the permissions set in dev portal and confirmed upon allowing the bot on the server,
  // but they're also enforced here. Bot can work with empty [] but Discord suggests adding
  // the minimum "guilds" intent (guild = server), taken from GatewayIntentBits (their websocket api)
  intents: [
    GatewayIntentBits.Guilds, // bare min to access server
    GatewayIntentBits.GuildMessages, // intent to receive message events
    GatewayIntentBits.MessageContent, // intent to read message content/embeds/attachments, etc.
    GatewayIntentBits.GuildMessageReactions, // intent to respond to emoji reactions
    GatewayIntentBits.GuildVoiceStates
  ],
  // Note: could also include the partials plugin here, but decided not to for the use case of this particular bot - everyone will just start fresh, no retro-actively given achievements
});

// A Collection from discord.js is a JS Map (unique [commandName]: command) that
// you can assign to the client obj. Now anywhere else in the app will have access to this collection
client.commands = new Collection();
client.commands.set(leaderboardCommand.data.name, leaderboardCommand);

// Using .once because this event only needs to happen upon first logging in.
client.once(Events.ClientReady, clientReadyHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);
client.on(Events.MessageCreate, messageCreateHandler);
client.on(Events.MessageReactionAdd, messageReactionHandler);
client.on(Events.VoiceStateUpdate, voiceStateHandler);

// Need to generate a discord bot token from dev portal and put in .env
// Automatically passed in as an arg for client.login(DISCORD_TOKEN)
// When running the start script, can see the bot as "online" in the server
client.login();