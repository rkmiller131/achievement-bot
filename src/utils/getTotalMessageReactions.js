module.exports = function getTotalMessageReactions(message) {
  const messageAuthor = message.author.id;
  let reactionCount = 0;

  message.reactions.cache.forEach((reaction) => {
    reaction.users.cache.forEach((user) => {
      const reactor = user.id;
      if (reactor !== messageAuthor) {
        reactionCount++;
      }
    });
  });

  return reactionCount;
}