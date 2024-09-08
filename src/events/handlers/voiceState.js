

async function voiceStateHandler(state) {
  const guildId = state.guild.id;
  const userId = state.id;
  const channel = state.channel;
  await channel.send('hello'); // <- this only works when a person leaves the channel, possibly because voice state is logged and changed after it happens (not really in real time like a true web socket)
  console.log('state is ', channel);

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
leaving channel is  VoiceState {
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
  id: '384151206559350784',
  serverDeaf: false,
  serverMute: false,
  selfDeaf: false,
  selfMute: false,
  selfVideo: false,
  sessionId: '7d6bfc6b2b73f79b3ed99431bd3e64fc',
  streaming: false,
  channelId: '1264925188588441733',
  suppress: false,
  requestToSpeakTimestamp: null
}
*/

/*
[ ] Oratory Overlord
[ ] Frequent Flyer
[ ] Final Boss

[ ] Daily Diligence
[ ] Top Contributor
[ ] Final Boss
*/