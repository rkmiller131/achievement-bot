const {
  createNewUser,
  getUserDocument,
  updateReactionStreak
} = require('../../utils/collections/server.collection');
const getTotalMessageReactions = require('../../utils/getTotalMessageReactions');
const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { checkIntrovert, checkFinalBoss } = require('../../utils/achievementChecks');

async function messageReactionHandler(reaction) {
  if(reaction.message.author.bot) return;

  const guildId = reaction.message.guildId;
  const message = reaction.message;
  const messageAuthorId = reaction.message.author.id;

  const lastReaction = Array.from(reaction.message.reactions.cache.values()).pop();
  const lastReactor = Array.from(lastReaction.users.cache.values()).pop();
  const reactionAuthorId = lastReactor.id;

  const { user } = await getUserDocument(guildId, reactionAuthorId);
  if (!user) {
    const userName = lastReactor.globalName;
    await createNewUser(guildId, reactionAuthorId, userName);
  }

  await updateReactionStreak(guildId, reactionAuthorId);
  await checkIntrovert(message, guildId, reactionAuthorId);

  const totalReactions = getTotalMessageReactions(message);

  if (totalReactions === 10) {
    const { user } = await getUserDocument(guildId, messageAuthorId);
    await findAndGiveAchievement('Senpai Noticed', user, message, guildId, messageAuthorId);
  }

  if (totalReactions === 25) {
    const { user } = await getUserDocument(guildId, messageAuthorId);
    await findAndGiveAchievement('Reaction Rockstar', user, message, guildId, messageAuthorId);
  }

  await checkFinalBoss(message, guildId, reactionAuthorId);
  await checkFinalBoss(message, guildId, messageAuthorId);
}

module.exports = {
  messageReactionHandler,
}