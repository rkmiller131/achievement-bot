const { Server } = require('../../../database/schema');
const mockingoose = require('mockingoose');
const { mockServer } = require('../db-mocks');
const {
  createNewUser,
  getServer,
  getUserDocument,
  giveUserAchievement
} = require('../server.collection');

beforeAll(async () => {
  mockingoose(Server)
    .toReturn(mockServer,'findOne')
    .toReturn(mockServer, 'findOneAndUpdate')
});

describe('Server Collection Utilities', () => {
  let mockGuildId, mockUserId, mockUserName, mockAchievementRef
  beforeEach(() => {
    mockGuildId = '1264924870425444443';
    mockUserId = '384151206559350782';
    mockUserName = 'RACHEL';
    mockAchievementRef = {
      achievement_id: '66e74f3f2259ce8634dc18e8',
      points: 100,
      date_acquired: '2024-10-02T13:46:14.118+00:00'
    };
    jest.spyOn(Server, 'findOneAndUpdate');
  });

  afterEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('should create a new user in a server', async () => {
    const newUser = {
      userId: mockUserId,
      globalName: mockUserName,
      channelsParticipatedIn: {},
      achievements: [],
      voiceState: {}
    }
    mockServer.users.push(newUser);
    mockingoose(Server)
    .toReturn(mockServer,'save')

    await createNewUser(mockGuildId, mockUserId, mockUserName);
    const server = await getServer(mockGuildId);
    expect(server.users.length).toBe(4);
  });

  it('should find a server and user document by userId', async () => {
    mockingoose(Server).toReturn(JSON.parse(JSON.stringify(mockServer)), 'findOne'); // Fresh copy deep clone
    const { user, server } = await getUserDocument(mockGuildId, mockUserId);
    expect(server).toBeDefined();
    expect(user.globalName).toBe('RACHEL');
  });

  it('should push an achievement to ther user\'s achievements array', async () => {
    await giveUserAchievement(mockAchievementRef, mockGuildId, mockUserId);
    const updateCondition = {
      guildId: mockGuildId
    };
    const updateOperation = {
      $push: { 'users.$[user].achievements': mockAchievementRef }
    };
    const options = {
      arrayFilters: [{ 'user.userId': mockUserId }]
    };

    expect(Server.findOneAndUpdate).toHaveBeenCalledWith(updateCondition, updateOperation, options);
  });
})