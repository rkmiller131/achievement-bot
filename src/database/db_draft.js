/*

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


*/