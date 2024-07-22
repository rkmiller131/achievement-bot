const { Client } = require('discord.js');

// Event Emitter Class (discord.js is OOP)
const client = new Client({ });

client.on('ready', () => {
  console.log('Achievment Bot logged into Discord')
});

client.login();