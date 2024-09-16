const {
  createNewUser,
  getUserDocument,
  updateReactionStreak
} = require('../../utils/collections/server.collection');
const getTotalMessageReactions = require('../../utils/getTotalMessageReactions');
const findAndGiveAchievement = require('../../utils/findAndGiveAchievement');
const { checkIntrovert } = require('../../utils/achievementChecks');

async function messageReactionHandler(reaction) {
  if(reaction.message.author.bot) return;

  const guildId = reaction.message.guildId;
  const message = reaction.message; // so that we can send replies/embeds to message.channel
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

  // Note - make a partials plugin in index.js so that rections can be viewed for past posts? I think it would be better not to do
  // partials and just have a disclaimer that achievement tracking won't go back in time - starts fresh upon being added to the server

  // check final boss

}

module.exports = {
  messageReactionHandler,
}

/*
[X] Senpai Noticed
[X] Reaction Rockstar
[X] Introvert
[ ] Final Boss

[ ] Oratory Overlord
[ ] Frequent Flyer

[ ] Daily Diligence
[ ] Top Contributor
[ ] Final Boss
*/