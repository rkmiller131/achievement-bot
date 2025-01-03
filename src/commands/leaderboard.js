const {
  SlashCommandBuilder,
  EmbedBuilder
} = require('discord.js');
const { getTop5Users } = require('../utils/collections/server.collection');

const data = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('Shows the Top 5 Achievers');

async function execute(interaction) {
  await interaction.deferReply();

  try {
    const top5Users = await getTop5Users(interaction.guildId);

    const embed = new EmbedBuilder()
      .setColor(0x0096FF)
      .setTitle(`Community Ranks Leaderboard`)
      .setDescription(`Top 5 Achievers in ${interaction.channel.guild.name}`)
      .setThumbnail('https://res.cloudinary.com/dnr41r1lq/image/upload/v1728845360/botThumbnail_plcxsc.jpg')
      .setTimestamp()

    top5Users.forEach((user, index) => {
      embed.addFields({
        name: `${index + 1}. ${user.globalName}`,
        value: `🏆 ${user.achievementCount} ${user.achievementCount > 1 ? 'achievements' : 'achievement'} - ${user.totalPoints} Points`,
      })
    });

    await interaction.editReply({
      embeds: [embed]
    });
  } catch (error) {
    await interaction.editReply(error);
  }
}

module.exports = {
  data,
  execute
}