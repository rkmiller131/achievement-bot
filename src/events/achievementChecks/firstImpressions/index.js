const { MENTION_STRING } = require('../../../utils/constants');
const { Achievement } = require('../../../database/schema');
const { generateAchievement } = require('../../../utils/achievement.collection');

module.exports = async function checkFirstImpressions(message, server, userId) {
  const userName = message.author.globalName;

  try {
    const firstImpressions = await Achievement.findOne({ name: 'First Impressions' }).exec();
    if (!firstImpressions) {
      message.channel.send('The "First Impressions" achievement is not available at this time');
      return;
    }
    const achievementEmbed = generateAchievement(firstImpressions);
    // add them to the database, give them First Impressions achievement
    // update the users achievement list to include this achievement in one, atomized transaction
    server.users.push({
      userId,
      globalName: userName,
      channelsParticpatedIn: {},
      achievements: [{
        achievement_id: firstImpressions._id,
        date_acquired: Date.now()
      }]
    });
    await server.save();
    message.channel.send({ embeds: [achievementEmbed], content: MENTION_STRING(userId) });

  } catch (error) {
    console.error('Error in creating new user, First Impressions: ', error);
    message.channel.send('An error occurred in saving this user and their first post achievement :(');
  }
}