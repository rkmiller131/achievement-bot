const {
  getServer,
  getUserDocument,
  userHasAchievement,
  giveUserAchievement
} = require('../../collections/server.collection');
const { Achievement } = require('../../../database/schema');
const checkSocialButterfly = require('../socialButterfly');

jest.mock('../../../database/schema');
jest.mock('../../collections/server.collection', () => ({
  getServer: jest.fn(),
  getUserDocument: jest.fn(),
  userHasAchievement: jest.fn(),
  giveUserAchievement: jest.fn()
}))

describe('Social Butterfly Achievement', () => {
  let message, user1, guildId, socialButterfly;

  beforeEach(() => {
    message = {
      channel: { send: jest.fn() }
    };

    user1 = {
      userId: '123',
      channelsParticipatedIn: { channel1: 1, channel2: 3, channel3: 2, channel4: 1, channel5: 1 },
      achievements: []
    }

    guildId = 'fakeGuildId';

    socialButterfly = {
      _id: '66b910ae6d550181a4eb2ba5',
      name: 'Social Butterfly',
      points: 25,
      rarity: 'Rare',
      assetURL: 'https://example.com/image2.png'
    }
    Achievement.findOne.mockResolvedValue(socialButterfly);
    getServer.mockReturnValue({
      _id: 'fakeServerId',
      guildId: 'fakeGuildId',
      users: [
        {
          userId: '123',
          channelsParticipatedIn: { channel1: 1, channel2: 3, channel3: 2, channel4: 1, channel5: 1 },
          achievements: []
        },
        {
          userId: '456',
          channelsParticipatedIn: { channel1: 3, channel2: 1 },
          achievements: []
        }
      ],
      save: jest.fn().mockResolvedValue(true)
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should give the achievement to users who participate in 5 or more different channels', async () => {
    userHasAchievement.mockReturnValue(false);
    getUserDocument.mockResolvedValueOnce({
      user: {
        userId: '123',
        channelsParticipatedIn: new Map([
          ['channel1', 1],
          ['channel2', 3],
          ['channel3', 2],
          ['channel4', 1],
          ['channel5', 1]
        ]),
        achievements: []
      },
      server: {
        save: jest.fn().mockResolvedValue(true)
      }
    });

    await checkSocialButterfly(message, guildId, '123');

    expect(message.channel.send).toHaveBeenCalledWith(expect.objectContaining({
      embeds: [expect.anything()],
      content: expect.stringContaining('@123')
    }));

    expect(giveUserAchievement).toHaveBeenCalledWith(expect.objectContaining({
      achievement_id: socialButterfly._id
    }), guildId, '123');
  });

  it('should not give the achievement to a user who hasnt met channel requirements', async () => {
    getUserDocument.mockResolvedValueOnce({
      user: {
        userId: '456',
        channelsParticipatedIn: new Map([
          ['channel1', 3],
          ['channel2', 1]
        ]),
        achievements: []
      },
      server: {
        save: jest.fn().mockResolvedValue(true)
      }
    });

    await checkSocialButterfly(message, guildId, '456');

    expect(message.channel.send).not.toHaveBeenCalled();
    expect(giveUserAchievement).not.toHaveBeenCalled();
  });
})