const mockAchievements = [
  {
    _id: '66e74f3f2259ce8634dc18da',
    name: 'First Impressions',
    description: 'Make your first post or contribution',
    points: 10,
    rarity: 'Common',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726428183/firstImpressions_zcx7oh.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18dd',
    name: 'GIF Gifter',
    description: 'Share 20 GIFs across the server',
    points: 20,
    rarity: 'Common',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726428269/gifGifterRevised_s1bnsj.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18dc',
    name: 'Senpai Noticed',
    description: 'Get 10 reactions on a single post',
    points: 20,
    rarity: 'Common',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726428242/senpaiNoticed_awb5rr.png'
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
  {
    _id: '',
    name: '',
    description: '',
    points: 10,
    rarity: 'Common',
    assetURL: ''
  },
]

const mockServer = {
    guildId: '1264924870425444445',
    users: [
      {
        userId: '384151206559350784',
        globalName: 'RACHEL',
        channelsParticipatedIn: {
          'general': 3,
          'bot-testing': 1,
          'art-text-only': 1,
          'memes': 1,
          'achievements': 100,
          'art': 10
        },
        reactionStreak: 9,
        gifsSent: 20,
        wavesGiven: 9,
        voiceState: {
          joinEvents: 102,
          joinDuration: 360001,
          lastJoinTimestamp: '2024-10-02T14:15:46.290+00:00'
        },
        achievements: [
          {
            achievement_id: '66e74f3f2259ce8634dc18da',
            points: 10,
            date_acquired: '2024-10-02T13:46:14.118+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18db',
            points: 15,
            date_acquired: '2024-10-02T13:48:52.967+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18e2',
            points: 30,
            date_acquired: '2024-10-02T13:54:37.335+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18e4',
            points: 40,
            date_acquired: '2024-10-02T14:02:00.815+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18dd',
            points: 20,
            date_acquired: '2024-10-02T14:02:39.314+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18de',
            points: 25,
            date_acquired: '2024-10-02T14:03:43.337+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18e0',
            points: 30,
            date_acquired: '2024-10-02T14:05:56.806+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18e1',
            points: 30,
            date_acquired: '2024-10-02T14:07:32.635+00:00'
          },
        ]
      },
      {
        userId: '1280900709298208901',
        globalName: 'TestUser',
        channelsParticipatedIn: {
          'general': 48,
          'art-text-only': 25,
          'memes': 25,
          'achievements': 27,
        },
        reactionStreak: 6,
        gifsSent: 0,
        wavesGiven: 0,
        voiceState: {
          joinEvents: 15,
          joinDuration: 26488,
          lastJoinTimestamp: '2024-10-02T14:15:46.290+00:00'
        },
        achievements: [
          {
            achievement_id: '66e74f3f2259ce8634dc18da',
            points: 10,
            date_acquired: '2024-10-02T13:50:09.690+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18dc',
            points: 20,
            date_acquired: '2024-10-02T13:55:34.058+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18e2',
            points: 30,
            date_acquired: '2024-10-02T13:57:06.289+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18e4',
            points: 40,
            date_acquired: '2024-10-02T14:00:00.697+00:00'
          },
        ]
      },
      {
        userId: '1291041944457183334',
        globalName: 'Tester2',
        channelsParticipatedIn: {
          'general': 2,
        },
        reactionStreak: 0,
        gifsSent: 0,
        wavesGiven: 0,
        voiceState: {
          joinEvents: 0,
          joinDuration: 0
        },
        achievements: [
          {
            achievement_id: '66e74f3f2259ce8634dc18da',
            points: 10,
            date_acquired: '2024-10-02T14:27:33.351+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18dc',
            points: 20,
            date_acquired: '2024-10-02T14:28:04.243+00:00'
          },
          {
            achievement_id: '66e74f3f2259ce8634dc18df',
            points: 30,
            date_acquired: '2024-10-02T14:28:47.734+00:00'
          }
        ]
      },
    ],
    channelActivity: []
}

module.exports = {
  mockAchievements,
  mockServer
}