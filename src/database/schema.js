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
    required: true,
    unique: true
  },
  date_acquired: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  userId: {
    type: String, // the Id from Discord
    required: true,
    unique: true,
    index: true
  },
  globalName: { type: String, required: true },
  channelsParticipatedIn: {
    type: Map,
    of: Number // storing [channelIdNumber]: participationCount
  },
  reactionStreak: {
    type: Number,
    default: 0
  },
  gifsSent: {
    type: Number,
    default: 0
  },
  achievements: [userAchievementSchema]
});

const channelActivitySchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
  year: { type: Number, required: true }
})

const serverSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true
  },
  users: [userSchema],
  channelActivity: {
    type: Map,
    of: [channelActivitySchema] // storing [channelIdNumber]: channelActivitySchema
  }
});

const Server = mongoose.model('Servers', serverSchema);
const Achievement = mongoose.model('Achievements', achievementSchema);

module.exports = {
  Server,
  Achievement
}