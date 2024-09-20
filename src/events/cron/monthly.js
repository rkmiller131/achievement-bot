/*
 Then search the database for channelActivity on the Server model.
 Filter for all activity with the correct pastMonth and pastYear
 Sort by userId while summing their occurences (counting posts)
 return the aggregation's first result ? OR get the first result, check if user has the
 achievement for top contributor already. If they don't give. If they do, try for the second one, recursively,
 until we find someone who was a top? Or should we just not hand out achivements every month? It should truly be top.
  const result = await Server.aggregate()
    .match({ guildId })
    .unwind('$channelActivity')
    .match({
      month: pastMonth,
      year: pastYear
    })
    .group({
      _id: userId,
      count: { $sum: 1 }
    })
    .sort({ count: -1 })

  result[0] ?

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


  Removing old months:
  only store about 2 months at a time.
  So if current month is September (8) that means it's september 1st.
  So we will be looking at 7, and we need to delete all entries from 6 (July)

  Edge cases: if current month is 0, deleteMonth = 10 deleteYear = currentYear - 1
  If the current month is 1, deleteMonth = 11, deleteYear = currentYear - 1
  Else:
  deleteMonth = currentMonth - 2
  deleteYear = currentYear

  Instead of a Server.deleteMany, it will be more performant to do an aggregation
  pipeline and SET a new collection with only the entries that meet certain parameters.
  It kills two birds with one stone, because you are already setting during the filter/cond step
  All other entries will be deleted as a side effect

  async function removeOldMonths(guildId, currentMonth, currentYear) {
  try {
    const deleteMonth = (() => {
      if (currentMonth <= 2) {
        return 10;
      } else if (currentMonth <= 7) {
        return currentMonth - 2;
      } else {
        return currentMonth - 2;
      }
    })();

    const deleteYear = currentMonth <= 2 ? currentYear - 1 : currentYear;

    const filter = {
      guildId,
      'channelActivity': {
        $exists: true,
        $type: 'object'
      }
    };

    const update = {
      $set: {
        channelActivity: {
          $cond: [
            { $and: [
              { $gte: [ '$$this.year', deleteYear ] },
              { $lte: [ '$$this.month', deleteMonth ] },
              { $lt: [ '$$this.day', 6 ] } // Keep entries from the current month
            ]},
            '$$this',
            null
          ]
        }
      }
    };

    await Server.updateMany(filter, update);

    console.log(`Successfully removed old months for guild ${guildId}`);
  } catch (error) {
    console.error(`Error removing old months for guild ${guildId}:`, error);
    throw error;
  }
}

when giving a user an achievement, we have access to a channel Id they have visited in the
channel activity.
const channel = client.channels.cache.get('id');
channel.send('content');

After each achievement check for a user, do a final boss check too and save ref to that same channel id

*/

/*
[ ] Top Contributor - send the most messages in a month
[ ] Daily Diligence - post every weekday for a month straight
[ ] Final Boss
*/

const cron = require('node-cron');
const getPast2MonthsAndYears = require('../../utils/getPast2MonthsAndYears');

async function monthlyCron(client) {
  // console.log('client is ', client);

  // minute, hour, day of month, month, day of week
  //  0-59   0-23      1-31      1-12     0-7 0 or 7 are Sun
  // On the first of every month, '0 0 1 1-12 *'
  cron.schedule('34 7 * * *', () => {
    console.log('Running a job at 12:00AM on the first of every month');
    // get the past 2 months worth of entries
    const { prevMonth, prevYear, deleteMonth, deleteYear } = getPast2MonthsAndYears();
  }, {
    timezone: 'America/Los_Angeles'
  });


  const { prevMonth, prevYear, deleteMonth, deleteYear } = getPast2MonthsAndYears();

}

module.exports = monthlyCron;