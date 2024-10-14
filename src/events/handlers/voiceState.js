const {
  createNewUser,
  getUserDocument,
  updateUserVoiceState
} = require('../../utils/collections/server.collection');
const {
  checkOratoryOverlord,
  checkFrequentFlyer,
  checkFinalBoss
} = require('../../utils/achievementChecks');
const { getPublicChannel } = require('../cron/monthly');

async function voiceStateHandler(oldState, newState) {
  const guildId = newState.guild.id;
  const userId = newState.id;
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;
  const joinEvent = newChannel && !oldChannel;
  const leaveEvent = !newChannel && oldChannel;
  const publicMessage = getPublicChannel();
  const channel = publicMessage ? publicMessage.channel : newChannel;

  const { user } = await getUserDocument(guildId, userId);
  if (!user) {
    const discordUserObj = await newState.guild.members.fetch(userId);
    const userName = discordUserObj.user.globalName;
    await createNewUser(guildId, userId, userName);
  }

  if (joinEvent) {
    const joinTimestamp = Date.now();
    await updateUserVoiceState(guildId, userId, joinTimestamp, null);
    await checkOratoryOverlord(channel, guildId, userId);
    await checkFrequentFlyer(channel, guildId, userId);

  } else if (leaveEvent) {
    const leaveTimestamp = Date.now();
    await updateUserVoiceState(guildId, userId, null, leaveTimestamp);
    if (publicMessage) {
      await checkFinalBoss(publicMessage, guildId, userId);
    }
  }

}

module.exports = {
  voiceStateHandler,
}