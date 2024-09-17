const checkFirstImpressions = require('../firstImpressions');
const { Achievement } = require('../../../database/schema');
const { generateAchievement, findAchievement } = require('../../collections/achievement.collection');
const { getUserDocument, userHasAchievement, giveUserAchievement } = require('../../collections/server.collection');

jest.mock('../../../database/schema');
jest.mock('../../collections/server.collection', () => ({
  getUserDocument: jest.fn(),
  userHasAchievement: jest.fn(),
  giveUserAchievement: jest.fn()
}));

jest.mock('../../collections/achievement.collection', () => ({
  findAchievement: jest.fn()
}))

beforeAll(() => {
  jest.spyOn(Date, 'now').mockImplementation(() => new Date('2024-08-13T16:50:32.114Z').getTime());
});

afterAll(() => {
  jest.spyOn(Date, 'now').mockRestore();
});

describe('First Impressions Achievement', () => {
  let message, guildId, userId, firstImpressions;

  beforeEach(() => {
    message = {
      author: { globalName: 'TestUser' },
      channel: { send: jest.fn() }
    };

    userId = '12345';
    guildId = 'testGuildId'

    firstImpressions = {
      _id: 'achievement-id',
      name: 'First Impressions',
      points: 10,
      rarity: 'Common',
      assetURL: 'https://example.com/image.png'
    };

    Achievement.findOne.mockResolvedValue(firstImpressions);

    getUserDocument.mockResolvedValueOnce({
      user: {
        userId: '12345',
        channelsParticipatedIn: new Map(),
        achievements: []
      },
      server: {
        save: jest.fn().mockResolvedValue(true)
      }
    });
    userHasAchievement.mockResolvedValueOnce(false);
    giveUserAchievement.mockResolvedValueOnce(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
  });

  it('should send a message if the "First Impressions" achievement is not found', async () => {
    findAchievement.mockResolvedValueOnce(null);

    await checkFirstImpressions(message, guildId, userId);

    expect(findAchievement).toHaveBeenCalledWith('First Impressions');
    expect(message.channel.send).toHaveBeenCalledWith('An error occurred in unlocking the \"First Impressions\" achievement :(');
  });

  // it('should call generateAchievement and send the correct embed', async () => {
  //   const achievement = {
  //     name: 'First Impressions',
  //     rarity: 'Common',
  //     points: 10,
  //     assetURL: 'https://example.com/image.png'
  //   }

  //   findAchievement.mockResolvedValueOnce(achievement);

  //   await checkFirstImpressions(message, guildId, userId);

  //   expect(message.channel.send).toHaveBeenCalledWith({
  //     embeds: [{ data: {
  //       title: 'First Impressions',
  //       description: 'Common',
  //       color: 0xC0C0C0,
  //       footer: {
  //         text: 'See the community ranks with "/Leaderboard"',
  //         icon_url: undefined,
  //       },
  //       image: {
  //         url: 'https://example.com/image.png',
  //       },
  //       timestamp: new Date('2024-08-13T16:50:32.114Z').toISOString()
  //     }}],
  //     content: `New Achievement <@${userId}>`,
  //   });
  // });
})
