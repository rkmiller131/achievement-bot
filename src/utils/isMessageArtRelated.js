const { REGEX_ART, ART_WORDS } = require('./constants');

module.exports = function isMessageArtRelated(message) {
  const channelName = message.channel.name;
  const artRelatedChannel = REGEX_ART.test(channelName) || ART_WORDS.includes(channelName);

  // only return true if this is an art related channel and user posted an attachment
  if (!artRelatedChannel) return false;
  if (message.attachments.size === 0) return 'art-text-only'; // see 'updateUserChannels'
  return true;
}