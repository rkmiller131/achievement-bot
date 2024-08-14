const { generateAchievement } = require('../achievement.collection');
const { EmbedBuilder } = require('discord.js');

describe('Achievement Collection Utilities', () => {
  it('should generate an achievement embed with the correct properties for Rare achievements', () => {
    const achievement = {
      rarity: 'Rare',
      name: 'Social Butterfly',
      assetURL: 'https://example.com/image.png',
    };

    const embed = generateAchievement(achievement);

    expect(embed).toBeInstanceOf(EmbedBuilder);
    expect(embed.data.color).toBe(0x6495ED); // color designated for Rare rarities
    expect(embed.data.title).toBe('Social Butterfly');
    expect(embed.data.description).toBe('Rare');
    expect(embed.data.image.url).toBe('https://example.com/image.png');
    expect(embed.data.footer.text).toBe('See the community ranks with "/Leaderboard"');
    expect(embed.data.timestamp).toBeDefined();
  });

  it('should generate an achievement embed with the correct properties for Epic achievements', () => {
    const achievement = {
      rarity: 'Epic',
      name: 'Art Aficionado',
      assetURL: 'https://example.com/image2.png',
    };

    const embed = generateAchievement(achievement);

    expect(embed.data.color).toBe(0x7F00FF);
    expect(embed.data.title).toBe('Art Aficionado');
    expect(embed.data.description).toBe('Epic');
    expect(embed.data.image.url).toBe('https://example.com/image2.png');
  })
})