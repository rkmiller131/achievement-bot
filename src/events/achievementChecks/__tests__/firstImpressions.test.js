const checkFirstImpressions = require('../firstImpressions');
const { Achievement } = require('../../../database/schema');
const { generateAchievement } = require('../../../utils/achievement.collection');

jest.mock('../../../database/schema');

beforeAll(() => {
  jest.spyOn(Date, 'now').mockImplementation(() => new Date('2024-08-13T16:50:32.114Z').getTime());
});

afterAll(() => {
  jest.spyOn(Date, 'now').mockRestore();
});

describe('First Impressions Achievement', () => {
  let message, server, userId, firstImpressions;

  beforeEach(() => {
    message = {
      author: { globalName: 'TestUser' },
      channel: { send: jest.fn() }
    };

    server = {
      users: [],
      save: jest.fn().mockResolvedValue(true)
    };

    userId = '12345';

    firstImpressions = {
      _id: 'achievement-id',
      name: 'First Impressions',
      rarity: 'Common',
      assetURL: 'https://example.com/image.png'
    };

    Achievement.findOne.mockResolvedValue(firstImpressions);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
  });

  it('should send a message if the "First Impressions" achievement is not found', async () => {
    Achievement.findOne.mockResolvedValue(null);

    await checkFirstImpressions(message, server, userId);

    expect(Achievement.findOne).toHaveBeenCalledWith({ name: 'First Impressions' });
    expect(message.channel.send).toHaveBeenCalledWith('The "First Impressions" achievement is not available at this time');
  });

  it('should call generateAchievement and send the correct embed', async () => {
    await checkFirstImpressions(message, server, userId);

    console.log('Arguments passed to message.channel.send:', message.channel.send.mock.calls);

    expect(message.channel.send).toHaveBeenCalledWith({
      embeds: [{ data: {
        title: 'First Impressions',
        description: 'Common',
        color: 0xC0C0C0,
        footer: {
          text: 'See the community ranks with "/Leaderboard"',
          icon_url: undefined,
        },
        image: {
          url: 'https://example.com/image.png',
        },
        timestamp: new Date('2024-08-13T16:50:32.114Z').toISOString()
      }}],
      content: `New Achievement <@${userId}>`,
    });
  });

  it('should handle database save errors gracefully', async () => {
    Achievement.findOne.mockRejectedValue(new Error('An error thrown for testing'));

    await checkFirstImpressions(message, server, userId);

    expect(Achievement.findOne).toHaveBeenCalledWith({ name: 'First Impressions' });
    expect(message.channel.send).toHaveBeenCalledWith('An error occurred in saving this user and their first post achievement :(');
  });
})