const {
  SlashCommandBuilder,
  EmbedBuilder
} = require('discord.js');
const { getTop5Users } = require('../utils/server.collection');

const data = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('Shows the Top 5 Achievers');

async function execute(interaction) {
  // because we need to wait for a db interaction, we don't know how long that will take.
  // Discord allows for 3 seconds before it considers the wait an error, so we specify a deferred reply
  // and call it immediately to trigger an immediate, ephemeral reply that says the bot is thinking.
  await interaction.deferReply(); // now we get 15 whole minutes to complete our tasks

  try {
    const top5Users = await getTop5Users(interaction.guildId);

    const embed = new EmbedBuilder()
      .setColor(0x0096FF)
      .setTitle(`Community Ranks Leaderboard`)
      .setDescription(`Top 5 Achievers in ${interaction.channel.guild.name}`)
      .setThumbnail('https://res.cloudinary.com/dnr41r1lq/image/upload/v1725371083/confetti_ehzngc.png')
      .setTimestamp()

    top5Users.forEach((user, index) => {
      embed.addFields({
        name: `${index + 1}. ${user.globalName}`,
        value: `🏆 ${user.achievementCount} achievements - ${user.totalPoints} Points`,
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