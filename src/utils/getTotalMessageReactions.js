module.exports = function getTotalMessageReactions(message) {
  const messageAuthor = message.author.id;
  let reactionCount = 0;
  // every emoji type is in a reaction cache
  message.reactions.cache.forEach((reaction) => {
    // however many duplicates of that emoji, check the users that used that specific emoji
    reaction.users.cache.forEach((user) => {
      const reactor = user.id;
      // as long as the person who used that emoji is not the same as the message author,
      if (reactor !== messageAuthor) {
        // increment the reaction count - we count duplicate emojis, but not same author/reactor ids
        reactionCount++;
      }
    });
  });
  return reactionCount;
}