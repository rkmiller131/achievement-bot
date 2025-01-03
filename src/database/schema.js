const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, required: true },
  rarity: { type: String, required: true },
  assetURL: { type: String, required: true },
});

const userAchievementSchema = new mongoose.Schema({
  achievement_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  date_acquired: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const voiceSchema = new mongoose.Schema({
  joinEvents: { type: Number, default: 0 },
  joinDuration: { type: Number, default: 0}, // time in seconds (100 hours = 360000 sec)
  lastJoinTimestamp: { type: Date }
}, { _id: false });

const userSchema = new mongoose.Schema({
  userId: {
    type: String, // the Id from Discord
    required: true
  },
  globalName: { type: String, required: true },
  channelsParticipatedIn: {
    type: Map,
    of: Number // storing [channelName]: participationCount
  },
  reactionStreak: {
    type: Number,
    default: 0
  },
  gifsSent: {
    type: Number,
    default: 0
  },
  wavesGiven: {
    type: Number,
    default: 0
  },
  voiceState: voiceSchema,
  achievements: [userAchievementSchema]
});

const channelActivitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  channelId: { type: String, required: true },
  month: { type: Number, required: true, index: true },
  day: { type: Number, required: true },
  year: { type: Number, required: true, index: true },
  fullDate: { type: Date, required: true }
});

const serverSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true
  },
  users: {type: [userSchema], default: []},
  channelActivity: { type: [channelActivitySchema], default: [] },
  dailyUserActivity: { type: [channelActivitySchema], default: [] }
});

const Server = mongoose.model('Servers', serverSchema);
const Achievement = mongoose.model('Achievements', achievementSchema);

module.exports = {
  Server,
  Achievement
}