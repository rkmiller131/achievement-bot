const cron = require('node-cron');
const getPast2MonthsAndYears = require('../../utils/getPast2MonthsAndYears');
const { checkTopContributor, checkDailyDiligence, checkFinalBoss } = require('../../utils/achievementChecks');
const { removeChannelActivityByMonth } = require('../../utils/collections/server.collection');

let PUBLIC_CHANNEL = null;

async function monthlyCron(message, guildId) {
  cron.schedule('0 0 1 1-12 *', async () => {
    console.log('Running a job at 12:00AM on the first of every month');
    const { prevMonth, prevYear, deleteMonth, deleteYear } = getPast2MonthsAndYears();

    const topUserId = await checkTopContributor(PUBLIC_CHANNEL, guildId, prevMonth, prevYear);
    await checkFinalBoss(PUBLIC_CHANNEL, guildId, topUserId);

    await checkDailyDiligence(PUBLIC_CHANNEL, guildId, prevMonth, prevYear);
    await removeChannelActivityByMonth(guildId, deleteMonth, deleteYear);
    achieverIds.length = 0;
  }, {
    timezone: 'America/Los_Angeles'
  });

  const everyone = message.channel.guild.roles.everyone;
  const channelPermissions = message.channel.permissionsFor(everyone); // bitflag
  const isPublic = channelPermissions.has('ViewChannel');

  if (isPublic) {
    PUBLIC_CHANNEL = message;
    console.log('public channel updated');
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