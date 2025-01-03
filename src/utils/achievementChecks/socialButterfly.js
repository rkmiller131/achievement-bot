const findAndGiveAchievement = require('../findAndGiveAchievement');
const { getUserDocument } = require('../collections/server.collection');
const { REGEX_ART, ART_WORDS } = require('../constants');

module.exports = async function checkSocialButterfly(message, guildId, userId) {
  const { user } = await getUserDocument(guildId, userId);
  // Because we manually created an art-text-channel, don't count this in addition to other art channels
  const channelKeys = Array.from(user.channelsParticipatedIn.keys());
  const userArtChannels = channelKeys.filter((key) => REGEX_ART.test(key) || ART_WORDS.includes(key));
  // if the matching results includes 'art-text-only' then
  // subtract one from the size during the check. otherwise normal check.
  const numChannels = (userArtChannels.length > 1 && userArtChannels.includes('art-text-only')) ?
    user.channelsParticipatedIn.size - 1 : user.channelsParticipatedIn.size;

  if (numChannels !== 5) return;

  await findAndGiveAchievement('Social Butterfly', user, message, guildId, userId);
}