/*
SQL VERSION
achievements table:
id
name
description
points
assetURL

users table:
id
name
server_id(?) need to read up on how discord bots separate by server they're in - can we do a separate db for each? combined?
channels_participated_in Set() "channel": count
achievmentCount
reactionStreak
gifsSent

user_achievements table
id
user_id FK
achievement_id FK
date_acquired

channel_activity table (the cron job)
id
channelName
user_id FK of user associated with that activity
month
year
day

NOSQL VERSION
{
// one collection for servers
  servers: [
    {
      ObjectID: 1293871298379,
      guild_id: from discord to denote server id from their end
      name: name of server,
      users: [
        {
          userId: id from discord,
          channelsParticpatedIn: a Set() where [key is channel]: value is count of messages sent in this channel
          reactionStreak: number,
          gifsSent: number across all channels in the server,
          // limit redundancy as much as possible. Also use .length for achievment count
          achievements: [
            {
              achievement_id: ObjectId from achievements collection,
              dateAcquired: datetime format
            }
          ]
        }
      ],
      channelActivity: {
        channelName: [
          {
            interactionId: ObjectId?,
            userId: discord user id of the person who did the interaction,
            month: break up the datetime, it's important for some achievements
            day: string,
            year: number
          }
        ]
      }
    }
  ],
  // this is a separate collection
  achievements: [
    {
      ObjectID: 92792857928347,
      name: string,
      description: string,
      points: number,
      assetURL: string
    }
  ]
}
*/