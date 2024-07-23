require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  Events
} = require('discord.js');

// Event Emitter Class (discord.js is OOP)
const client = new Client({
  // intents define which events discord sends to the bot.
  // Not only are the permissions set in dev portal, not only are they confirmed upon
  // allowing the bot on the server, but they're also enforced here. Bot can work with empty []
  // but Discord suggests adding the "guilds" intent (guild = server), taken from GatewayIntentBits
  intents: [
    GatewayIntentBits.Guilds,
  ]
});

client.on(Events.ClientReady, () => {
  console.log('Achievment Bot logged into Discord')
});

// Need to generate a discord bot token from dev portal and put in .env
// Automatically passed in as an arg for client.login(DISCORD_TOKEN)
client.login();