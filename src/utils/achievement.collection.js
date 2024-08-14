const { EmbedBuilder } = require('discord.js');

function generateAchievement(achievement) {
	const { rarity, name, assetURL } = achievement;
	const color = rarity === 'Common' ?
		0xC0C0C0 : rarity === 'Rare' ?
		0x6495ED : rarity === 'Epic' ?
		0x7F00FF : 0xFFA000;

  const embed = new EmbedBuilder()
	.setColor(color)
	.setTitle(name)
	.setDescription(rarity)
	.setImage(assetURL)
	.setTimestamp()
	.setFooter({ text: 'See the community ranks with "/Leaderboard"' });

  return embed;
}

module.exports = {
  generateAchievement,
}