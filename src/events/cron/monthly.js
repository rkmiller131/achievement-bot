/*

 Daily diligence:

 const result = await Server.aggregate()
  .match({ guildId })
  .unwind('$channelActivity')
  .match({
    'channelActivity.month': pastMonth,
    'channelActivity.year': pastYear,
    'channelActivity.day': { $lte: 5, $gte: 1 }
  })
  .group({
    _id: '$channelActivity.userId',
    count: { $sum: 1 }
  })
  .match({ count: { $gte: 20 } }) <- there are roughly 20 - 23 weekdays in every month, just do roughly 20.

  Now iterate over each result and give achievement for daily diligence.

when giving a user an achievement, we have access to a channel Id they have visited in the
channel activity.
const channel = client.channels.cache.get('id');
channel.send('content');

After each achievement check for a user, do a final boss check too and save ref to that same channel id

*/

const cron = require('node-cron');
const getPast2MonthsAndYears = require('../../utils/getPast2MonthsAndYears');
const { checkTopContributor, checkDailyDiligence } = require('../../utils/achievementChecks');
const { removeChannelActivityByMonth } = require('../../utils/collections/server.collection');

let PUBLIC_CHANNEL = null;

async function monthlyCron(message, guildId) {
  // minute, hour, day of month, month, day of week
  //  0-59   0-23      1-31      1-12     0-7 0 or 7 are Sun
  // On the first of every month, '0 0 1 1-12 *'
  cron.schedule('* 7 * * *', async () => {
    console.log('Running a job at 12:00AM on the first of every month');
    // get the past 2 months worth of entries
    const { prevMonth, prevYear, deleteMonth, deleteYear } = getPast2MonthsAndYears();

    const topUserId = await checkTopContributor(PUBLIC_CHANNEL, guildId, prevMonth, prevYear);
    await checkFinalBoss(PUBLIC_CHANNEL, guildId, topUserId);

    // check the daily diligence one
    // (daily diligence also checks final boss for each achiever)
    await checkDailyDiligence(PUBLIC_CHANNEL, guildId, prevMonth, prevYear);
    await removeChannelActivityByMonth(guildId, deleteMonth, deleteYear);
    // reset/clear the id array for next cron schedule
    achieverIds.length = 0;
  }, {
    timezone: 'America/Los_Angeles'
  });

  // Make sure the message channel we got is a public one (everyone can see it)
  const everyone = message.channel.guild.roles.everyone;
  const channelPermissions = message.channel.permissionsFor(everyone); // bitflag
  const isPublic = channelPermissions.has('ViewChannel');

  if (isPublic) {
    PUBLIC_CHANNEL = message;
    console.log('public channel updated');
    // const { prevMonth, prevYear, deleteMonth, deleteYear } = getPast2MonthsAndYears();
    // await checkTopContributor(message, guildId, prevMonth, prevYear);
    // await removeChannelActivityByMonth(guildId, deleteMonth, deleteYear);
    // await checkDailyDiligence(PUBLIC_CHANNEL, guildId, prevMonth, prevYear);
    return true;
  }
  console.log('message was not in a public channel');
}

const getPublicChannel = () => {
  if (PUBLIC_CHANNEL) {
    return PUBLIC_CHANNEL;
  } else {
    console.log('PUBLIC_CHANNEL is not yet set.');
    return null;
  }
};

module.exports = {
  monthlyCron,
  getPublicChannel
};

/*
[X] Top Contributor - send the most messages in a month
[X] Daily Diligence - post every weekday for a month straight
[X] Final Boss - iterate for every user that got an achievement during cron job
*/