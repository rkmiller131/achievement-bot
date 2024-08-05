const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
  achievement_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
    required: true
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
  channelsParticpatedIn: {
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
  achievements: [userAchievementSchema]
});

const channelActivitySchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
  year: { type: Number, required: true }
})

const serverSchema = new mongoose.Schema({
  guildId: String,
  name: String,
  users: [userSchema],
  channelActivity: {
    type: Map,
    of: [channelActivitySchema]
  }

});

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, required: true },
  assetURL: { type: String, required: true },
});

const Server = mongoose.model('Server', serverSchema);
const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = {
  Server,
  Achievement
}