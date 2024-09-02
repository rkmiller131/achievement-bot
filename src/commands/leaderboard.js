const { SlashCommandBuilder } = require('discord.js');
const { getTop5Users } = require('../utils/server.collection');

const data = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('Shows the Top 5 Achievers');

// The execute method contains functionality to run from the event handler when the command is used.
async function execute(interaction) {
  await interaction.reply('Pong!');
  await getTop5Users(interaction.guildId);
}

module.exports = {
  data,
  execute
}

/*
interaction contains  ChatInputCommandInteraction {
  type: 2,
  id: '1279463539668684920',
  applicationId: '1264779705685639261',
  channelId: '1264925569410138136',
  guildId: '1264924870425444445',
  user: User {
    id: '384151206559350784',
    bot: false,
    system: false,
    flags: UserFlagsBitField { bitfield: 0 },
    username: 'cometbloom',
    globalName: 'R/A\\CHEL',
    discriminator: '0',
    avatar: '6073928e18590f0f2a96c9ea5eb2ac28',
    banner: undefined,
    accentColor: undefined,
    avatarDecoration: null
  },
  member: GuildMember {
    guild: Guild {
      id: '1264924870425444445',
      name: 'Test Server',
      icon: 'c637e4bb3df358dfd6d02415c0cabdc9',
      features: [],
      commands: [GuildApplicationCommandManager],
      members: [GuildMemberManager],
      channels: [GuildChannelManager],
      bans: [GuildBanManager],
      roles: [RoleManager],
      presences: PresenceManager {},
      voiceStates: [VoiceStateManager],
      stageInstances: [StageInstanceManager],
      invites: [GuildInviteManager],
      scheduledEvents: [GuildScheduledEventManager],
      autoModerationRules: [AutoModerationRuleManager],
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
      memberCount: 3,
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
      systemChannelFlags: [SystemChannelFlagsBitField],
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
      emojis: [GuildEmojiManager],
      stickers: [GuildStickerManager]
    },
    joinedTimestamp: 1721651990284,
    premiumSinceTimestamp: null,
    nickname: null,
    pending: false,
    communicationDisabledUntilTimestamp: null,
    user: User {
      id: '384151206559350784',
      bot: false,
      system: false,
      flags: [UserFlagsBitField],
      username: 'cometbloom',
      globalName: 'R/A\\CHEL',
      discriminator: '0',
      avatar: '6073928e18590f0f2a96c9ea5eb2ac28',
      banner: undefined,
      accentColor: undefined,
      avatarDecoration: null
    },
    avatar: null,
    flags: GuildMemberFlagsBitField { bitfield: 0 }
  },
  version: 1,
  appPermissions: PermissionsBitField { bitfield: 2248473465843265n },
  memberPermissions: PermissionsBitField { bitfield: 2251799813685247n },
  locale: 'en-US',
  guildLocale: 'en-US',
  entitlements: Collection(0) [Map] {},
  commandId: '1279461068749410387',
  commandName: 'leaderboard',
  commandType: 1,
  commandGuildId: '1264924870425444445',
  deferred: false,
  replied: false,
  ephemeral: null,
  webhook: InteractionWebhook { id: '1264779705685639261' },
  options: CommandInteractionOptionResolver {
    _group: null,
    _subcommand: null,
    _hoistedOptions: []
  }
}
*/