const { EmbedBuilder } = require('discord.js');

function generateAchievement(achievement) {
  const embed = new EmbedBuilder()
	.setColor(0xFFA000)
	.setTitle(`${achievement.name}`)
	.setDescription(`${achievement.rarity}`)
	.setImage(achievement.assetURL)
	.setTimestamp()
	.setFooter({ text: 'See the community ranks with "/Leaderboard"' });

  return embed;
}

module.exports = {
  generateAchievement,
}