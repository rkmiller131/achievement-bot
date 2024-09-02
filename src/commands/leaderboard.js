const { SlashCommandBuilder } = require('discord.js');
const { getTop5Users } = require('../utils/server.collection');

const data = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('Shows the Top 5 Achievers');

async function execute(interaction) {
  await interaction.reply('Pong!');
  // const channelNames = interaction.member.guild.channels.cache.map(channel => channel.name);
  // console.log('Channel names:', channelNames);
  console.log('interaction channel? ', interaction.channel) // YESS can use this .send to send a message embed to whatever channel executed the slash command!
  const top5Users = await getTop5Users(interaction.guildId);
}

module.exports = {
  data,
  execute
}