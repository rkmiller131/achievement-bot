const MENTION_STRING = (userId) => `New Achievement <@${userId}>`;

// Matches the word 'art' as a whole word or part of a hyphen string
const REGEX_ART = /^(?:art(?:-\w+)?|\w+-art)/i;

const ART_WORDS = ['artwork', 'artist', 'artistic', 'artsy'];

module.exports = {
  MENTION_STRING,
  REGEX_ART,
  ART_WORDS,
}