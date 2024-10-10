const mongoose = require('mongoose');

const mockAchievements = [
  {
    _id: new mongoose.Types.ObjectId('66e74f3f2259ce8634dc18da'),
    name: 'First Impressions',
    description: 'Make your first post or contribution',
    points: 10,
    rarity: 'Common',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726428183/firstImpressions_zcx7oh.png'
  },
  {
    _id: new mongoose.Types.ObjectId('66e74f3f2259ce8634dc18dd'),
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
    _id: '66e74f3f2259ce8634dc18e5',
    name: 'Daily Diligence',
    description: 'Post every weekday for a month straight',
    points: 40,
    rarity: 'Epic',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429597/dailyDiligence_rxk6el.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18de',
    name: 'Social Butterfly',
    description: 'Participate in 5 different text channels',
    points: 25,
    rarity: 'Rare',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429309/socialButterfly_lydozl.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18df',
    name: 'Reaction Rockstar',
    description: 'Get 25 reactions on a single post',
    points: 30,
    rarity: 'Rare',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429333/reactionRockstar_rzyos3.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18e0',
    name: 'Frequent Flyer',
    description: 'Join and leave voice channels 100 times',
    points: 30,
    rarity: 'Rare',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429359/frequentFlyer_lvkx4f.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18e1',
    name: 'Jabberwocky',
    description: 'Send 100 messages in a single text channel',
    points: 30,
    rarity: 'Rare',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429401/jabberwockyRevised_coduue.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18e2',
    name: 'Introvert',
    description: 'React to 10 messages in a row without posting one yourself',
    points: 30,
    rarity: 'Rare',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429428/introvert_xb3ank.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18e3',
    name: 'Art Aficionado',
    description: 'Share 10 attachments in #art channels',
    points: 35,
    rarity: 'Epic',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429476/artAficionado_kkytmu.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18e4',
    name: 'Top Contributor',
    description: 'Send the most messages in a month',
    points: 40,
    rarity: 'Epic',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429632/topContributor_uzxuvh.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18db',
    name: 'Welcome Wagon',
    description: 'Greet and wave to 10 new members',
    points: 15,
    rarity: 'Common',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726428217/welcomeWagonRevised_cghiqn.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18e6',
    name: 'Insomniac',
    description: 'Post between 2AM and 4AM local time',
    points: 50,
    rarity: 'Legendary',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429518/insomniacRevised_moy7tk.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18e7',
    name: 'Oratory Overlord',
    description: 'Spend 100 hours talking in voice channels',
    points: 50,
    rarity: 'Legendary',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429545/oratoryOverlord_emqzmk.png'
  },
  {
    _id: '66e74f3f2259ce8634dc18e8',
    name: 'Final Boss',
    description: 'Obtain all possible achievements',
    points: 100,
    rarity: 'Legendary',
    assetURL: 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1726429571/finalBoss_qhbi7o.png'
  },
]

const mockServer = {
    _id: new mongoose.Types.ObjectId(),
    guildId: '1264924870425444443',
    users: [
      {
        userId: '384151206559350782',
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
    channelActivity: [
      {
        userId: '384151206559350784',
        channelId: '1264924870425444448',
        month: 9,
        day: 3,
        year: 2024,
        _id: '66fd4ea5fab83f8095178f79'
      }
    ]
}

module.exports = {
  mockAchievements,
  mockServer
}