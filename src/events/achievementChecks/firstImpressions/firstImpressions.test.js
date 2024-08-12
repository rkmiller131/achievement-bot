const { checkFirstImpressions } = require('../achievementChecks/firstImpressions');
const { Achievement } = require('../../../database/schema');
const { generateAchievement } = require('../../../utils/achievement.collection');
const { connectMongoDB, disconnectMongoDB } = require('../../../database/mongo.service');

jest.mock('../../../database/schema', () => ({
  Achievement: {
    findOne: jest.fn(),
  },
}));

jest.mock('../../../utils/achievement.collection', () => ({
  generateAchievement: jest.fn(),
}));

describe('First Impressions Achievement', () => {
  beforeAll(async () => {
    await connectMongoDB();
  });

  afterAll(async () => {
    await disconnectMongoDB();
  })
})

// describe('checkFirstImpressions', () => {
//   beforeEach(() => {
//     // Reset mocks before each test
//     jest.clearAllMocks();
//   });

//   it('should send a message and update the database on successful execution', async () => {
//     // Setup mocks
//     const mockMessage = {
//       author: {
//         globalName: 'TestUser',
//       },
//       channel: {
//         send: jest.fn(),
//       },
//     };
//     const mockServer = {
//       users: [],
//       push: jest.fn(),
//       save: jest.fn(),
//     };
//     const mockUserId = '12345';

//     Achievement.findOne.mockResolvedValueOnce(/* mock Achievement object */);
//     generateAchievement.mockReturnValueOnce(/* mock achievementEmbed */);

//     // Call the function
//     await checkFirstImpressions(mockMessage, mockServer, mockUserId);

//     // Assertions
//     expect(Achievement.findOne).toHaveBeenCalled();
//     expect(generateAchievement).toHaveBeenCalledWith(expect.any(Object));
//     expect(mockServer.push).toHaveBeenCalledWith({
//       userId: mockUserId,
//       globalName: 'TestUser',
//       channelsParticpatedIn: {},
//       achievements: [{ achievement_id: expect.any(String), date_acquired: expect.any(Number) }],
//     });
//     expect(mockServer.save).toHaveBeenCalled();
//     expect(mockMessage.channel.send).toHaveBeenCalledWith({ embeds: [/* mock achievementEmbed */, content: 'MentionString' ]);
//   });

//   it('should handle errors gracefully', async () => {
//     // Setup mocks to throw an error
//     Achievement.findOne.mockRejectedValueOnce(new Error('Database error'));

//     await expect(checkFirstImpressions(mockMessage, mockServer, mockUserId)).rejects.toThrow('Database error');

//     expect(Achievement.findOne).toHaveBeenCalled();
//     expect(mockMessage.channel.send).toHaveBeenCalledWith('An error occurred in saving this user and their first post achievement :(');
//   });
// });
