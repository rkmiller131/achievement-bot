const { SlashCommandBuilder } = require('discord.js');

// The data property provides the command definition to register with Discord within the Command Handler
const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

// The execute method contains functionality to run from the event handler when the command is used.
async function execute(interaction) {
  await interaction.reply('Pong!');
}

module.exports = {
  data,
  execute
}

// Couple ways to export these; could also pass it into module.exports directly:
// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName('ping')
//     .setDescription('Replies with Pong!')
//   async execute(interaction) {
//     await interaction.reply('Pong!');
//   }
// }