const { SlashCommandBuilder } = require('discord.js');
const { getTop5Users } = require('../utils/server.collection');

const data = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('Shows the Top 5 Achievers');

async function execute(interaction) {
  await interaction.reply('Pong!');
  const top5Users = await getTop5Users(interaction.guildId);
}

module.exports = {
  data,
  execute
}