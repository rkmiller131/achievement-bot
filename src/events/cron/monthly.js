/*

 Daily diligence:

 Same idea, but filter the server by guild Id then filter channelActivity by the month and year
 AND if the day falls between 1 - 5

 Then same thing, group by user id and sum, then sort that sum by count -1

 const result = await Server.aggregate()
  .match({ guildId })
  .unwind('$channelActivity')
  .match({
    month: pastMonth,
    year: pastYear,
    day: { $lte: 5, $gte: 1 }
  })
  .group({
    _id: userId,
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

/*
[ ] Top Contributor - send the most messages in a month
[ ] Daily Diligence - post every weekday for a month straight
*/

const cron = require('node-cron');
const getPast2MonthsAndYears = require('../../utils/getPast2MonthsAndYears');
const checkTopContributor = require('../../utils/achievementChecks/topContributor');
const { removeChannelActivityByMonth } = require('../../utils/collections/server.collection');

async function monthlyCron(message, guildId) {
  // minute, hour, day of month, month, day of week
  //  0-59   0-23      1-31      1-12     0-7 0 or 7 are Sun
  // On the first of every month, '0 0 1 1-12 *'
  cron.schedule('* 7 * * *', async () => {
    console.log('Running a job at 12:00AM on the first of every month');
    // get the past 2 months worth of entries
    const { prevMonth, prevYear, deleteMonth, deleteYear } = getPast2MonthsAndYears();
    await checkTopContributor(message, guildId, prevMonth, prevYear);
    await removeChannelActivityByMonth(guildId, deleteMonth, deleteYear);
  }, {
    timezone: 'America/Los_Angeles'
  });

  // Make sure the message channel we got is a public one (everyone can see it)
  // NOTE - this currently doesn't work, only checks role based permissions not selected members who can see channel.
  const everyone = message.channel.guild.roles.everyone;
  const channelPermissions = message.channel.permissionsFor(everyone); // bitflag
  // const channelPermissions = message.channel.permissionsFor(guildId); // bitflag
  const hasViewPermissions = (bitfield) => {
    return (BigInt(bitfield) & BigInt(0x400)) !== 0;
  }
  // console.log(hasViewPermissions(channelPermissions));
  console.log(channelPermissions.has('ViewChannel')) // <- THIS WORKS
  // CHANNEL TYPE IS NO GOOD
  // we could see if we could get access to the client again and see if we can send to the channel the user has posted in before

  const { prevMonth, prevYear, deleteMonth, deleteYear } = getPast2MonthsAndYears();
  // await checkTopContributor(message, guildId, prevMonth, prevYear);
  // await removeChannelActivityByMonth(guildId, deleteMonth, deleteYear);
  return true;

}

module.exports = monthlyCron;