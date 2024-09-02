// This function is responsible for calling the execute function that was registered on the command
async function interactionCreateHandler(interaction) {
  // not every interaction is a slash command; interactions can be buttons, messages, select menus, etc.
  if (interaction.isChatInputCommand()) { // slash commands
    // Interaction object has reference to the client, as well as the command name.
    // Use these to look up and retrieve the entire command object for that command.
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;
    // good practice to catch any errors that may occur upon running the execute.
    // The execute could perform any number of things!
    try {
      await command.execute(interaction);
      console.log(`${interaction.user.username} used the command: "/${interaction.commandName}"`);

    } catch (error) {
      console.error(error);
      // Some things that can cause an error include:
      // * The interaction was already replied to (something already sent in the execute)
      // * The interaction took too long to respond - Discord allows for up to 3s. Anything
      //   longer gets deferred, which is an error in Discord's eyes.
      // * Before the bot even replied, an error happened (maybe an external api failed)
      if (interaction.replied || interaction.deferred) {
        // If we can't predict how long a reply will take, we send a deferred reply & follow up
        // to let discord know we're still processing the interaction and things are ok. However if that
        // wasn't handled within the command definition, it's an error:
        // if the interaction received a reply but then there was an error afterwards (took too long, for example), followUp
        await interaction.followUp({
          content: 'There was an error executing this command',
          ephemeral: true // only the user who issued the command will see this, and can hit 'dismiss'
        });
      } else {
        // if the interaction hasn't been responded to yet but still produced an error, send a reply error catch
        await interaction.reply({
          content: 'There was an error executing this command',
          ephemeral: true
        });
      }
    }
  }
}

module.exports = {
  interactionCreateHandler,
}