module.exports = function isMessageArtRelated(message) {
   // channelName matches the word 'art' as a whole word or part of a hyphen string
  const regex = /(?<![a-z])(art)(?!\w)/gi;
  const channelName = message.channel.name.toLowerCase();
  const approvedWords = ['artwork', 'artist', 'artistic', 'artsy'];

  const artRelatedChannel = regex.test(channelName) || approvedWords.includes(channelName);
  // only return true if this is an art related channel and user posted an attachment
  if (!artRelatedChannel) return false;
  if (message.attachments.size === 0) return 'art-text-only';
  return true;
}