const { updateUserVoiceState } = require('../../utils/server.collection');

async function voiceStateHandler(oldState, newState) {
  const guildId = newState.guild.id;
  const userId = newState.id;
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;

  // if new channel is present and old channel is null, we have a join event by the user.
  if (newChannel && !oldChannel) {
    const joinTimestamp = Date.now();
    // update user voice join event (increment join events, update lastjoin timestamp)
    await updateUserVoiceState(guildId, userId, joinTimestamp, null);
    // check for achievements here and only send achievement embeds in newChannel

    // if new channel is null and oldChannel is not null, we have a leave event by the user.
  } else if (!newChannel && oldChannel) {
    // using the user's lastJoinTimestamp calc the difference in date.now divided by 1000 and increment join duration for seconds.
    const leaveTimestamp = Date.now();
    await updateUserVoiceState(guildId, userId, null, leaveTimestamp);

  }

}

module.exports = {
  voiceStateHandler,
}

/*
joining state is  VoiceState {
  guild: <ref *1> Guild {
    id: '1264924870425444445',
    name: 'Test Server',
    icon: 'c637e4bb3df358dfd6d02415c0cabdc9',
    features: [],
    commands: GuildApplicationCommandManager {
      permissions: [ApplicationCommandPermissionsManager],
      guild: [Circular *1]
    },
    members: GuildMemberManager { guild: [Circular *1] },
    channels: GuildChannelManager { guild: [Circular *1] },
    bans: GuildBanManager { guild: [Circular *1] },
    roles: RoleManager { guild: [Circular *1] },
    presences: PresenceManager {},
    voiceStates: VoiceStateManager { guild: [Circular *1] },
    stageInstances: StageInstanceManager { guild: [Circular *1] },
    invites: GuildInviteManager { guild: [Circular *1] },
    scheduledEvents: GuildScheduledEventManager { guild: [Circular *1] },
    autoModerationRules: AutoModerationRuleManager { guild: [Circular *1] },
    available: true,
    shardId: 0,
    splash: null,
    banner: null,
    description: null,
    verificationLevel: 0,
    vanityURLCode: null,
    nsfwLevel: 0,
    premiumSubscriptionCount: 0,
    discoverySplash: null,
    memberCount: 4,
    large: false,
    premiumProgressBarEnabled: false,
    applicationId: null,
    afkTimeout: 300,
    afkChannelId: null,
    systemChannelId: '1264924870425444448',
    premiumTier: 0,
    widgetEnabled: null,
    widgetChannelId: null,
    explicitContentFilter: 0,
    mfaLevel: 0,
    joinedTimestamp: 1721740728965,
    defaultMessageNotifications: 0,
    systemChannelFlags: SystemChannelFlagsBitField { bitfield: 0 },
    maximumMembers: 500000,
    maximumPresences: null,
    maxVideoChannelUsers: 25,
    maxStageVideoChannelUsers: 50,
    approximateMemberCount: null,
    approximatePresenceCount: null,
    vanityURLUses: null,
    rulesChannelId: null,
    publicUpdatesChannelId: null,
    preferredLocale: 'en-US',
    safetyAlertsChannelId: null,
    ownerId: '384151206559350784',
    emojis: GuildEmojiManager { guild: [Circular *1] },
    stickers: GuildStickerManager { guild: [Circular *1] }
  },
  id: '384151206559350784', <-- THE USER ID OF THE USER WHO IS CURRENTLY CONNECTED AND THEIR VOICE STATES
  serverDeaf: null,
  serverMute: null,
  selfDeaf: null,
  selfMute: null,
  selfVideo: null,
  sessionId: null,
  streaming: null,
  channelId: null,
  suppress: null,
  requestToSpeakTimestamp: null
}
*/

/*
[ ] Oratory Overlord
[ ] Frequent Flyer

[ ] Daily Diligence
[ ] Top Contributor
[ ] Final Boss
*/