const {
  createNewUser,
  getUserDocument,
  updateUserVoiceState
} = require('../../utils/server.collection');

async function voiceStateHandler(oldState, newState) {
  const guildId = newState.guild.id;
  const userId = newState.id;
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;
  const joinEvent = newChannel && !oldChannel;
  const leaveEvent = !newChannel && oldChannel;

  const { user } = await getUserDocument(guildId, userId);
  if (!user) {
    const discordUserObj = await newState.guild.members.fetch(userId);
    const userName = discordUserObj.user.globalName;
    await createNewUser(guildId, userId, userName);
  }

  if (joinEvent) {
    const joinTimestamp = Date.now();
    // update user voice join event (increment join events, update lastjoin timestamp)
    await updateUserVoiceState(guildId, userId, joinTimestamp, null);
    // check for achievements here and only send achievement embeds in newChannel

    // if new channel is null and oldChannel is not null, we have a leave event by the user.
  } else if (leaveEvent) {
    // using the user's lastJoinTimestamp calc the difference in date.now divided by 1000 and increment join duration for seconds.
    const leaveTimestamp = Date.now();
    await updateUserVoiceState(guildId, userId, null, leaveTimestamp);
  }

}

module.exports = {
  voiceStateHandler,
}

/*
[ ] Oratory Overlord
[ ] Frequent Flyer

[ ] Daily Diligence
[ ] Top Contributor
[ ] Final Boss
*/