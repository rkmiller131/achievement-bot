const getTotalMessageReactions = require('../getTotalMessageReactions');

describe('Get Total Message Reactions', () => {
  it('should count reactions from all users except message author', () => {
    const mockMessage = {
      id: '123456789012345678',
      content: 'Hello, world!',
      author: { id: '123456789012345678' },
      reactions: {
        cache: [
          {
            users: {
              cache: [
                { id: '987654321098765432' }
              ]
            }
          },
          {
            users: {
              cache: [
                { id: '987654321098765433' }
              ]
            }
          },
          {
            users: {
              cache: [
                { id: '123456789012345678' }
              ]
            }
          }
        ],
      }
    };

    const result = getTotalMessageReactions(mockMessage);
    expect(result).toBe(2);
  });
});
