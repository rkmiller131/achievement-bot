const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { getUserDocument } = require('../../utils/server.collection');
const { REGEX_ART, ART_WORDS } = require('../../utils/constants');

module.exports = async function checkSocialButterfly(message, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  // Because we manually created an art-text-channel, don't count this in addition to other art channels
  const channelKeys = Array.from(user.channelsParticipatedIn.keys());
  const userArtChannels = channelKeys.filter((key) => REGEX_ART.test(key) || ART_WORDS.includes(key));

  const numChannels = (userArtChannels.length > 1 && userArtChannels.includes('art-text-only')) ?
    user.channelsParticipatedIn.size - 1 : user.channelsParticipatedIn.size;

  // if the matching results (assuming we get back an array) includes 'art-text-only' then
  // subtract one from the size during the check. otherwise normal check.
  if (numChannels !== 5) return;

  await findAndGiveAchievement('Social Butterfly', user, message, guildId, userId);
}