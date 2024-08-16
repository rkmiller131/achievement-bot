const { MENTION_STRING } = require('../../utils/constants');
const { getServer } = require('../../utils/server.collection');
const { generateAchievement, findAchievement } = require('../../utils/achievement.collection');

module.exports = async function checkFirstImpressions(message, guildId, userId) {
  const userName = message.author.globalName;
  const server = await getServer(guildId);

  try {
    const firstImpressions = await findAchievement('First Impressions');
    const achievementEmbed = generateAchievement(firstImpressions);
    // add them to the database, give them First Impressions achievement
    // update the users achievement list to include this achievement in one, atomized transaction
    server.users.push({
      userId,
      globalName: userName,
      channelsParticipatedIn: {},
      achievements: [{
        achievement_id: firstImpressions._id,
        points: firstImpressions.points,
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