const {
  REST,
  Routes
} = require('discord.js');
const { connectMongoDB } = require('../../database/mongo-service');

// Sometimes it's nice to specify a version so that, in the future, the commands still work as expected
const discordAPI = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function clientReadyHandler(client) {
  console.log(`${client.user.tag} is online`);
  await connectMongoDB();

  // The client is used to register commands with Discord using the REST API from discord
  // This alone isn't enough to get a ping command to respond, however. You need three parts:
  // One is the command definition, Two is the command registration, and Three is the interaction event listener
  try {
    const data = await discordAPI.put(
      // Register the achievement bot app id with the current server id
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      // Send a JSON payload array as the request body
      { body: client.commands.map((command) => command.data.toJSON()) }
    );
  } catch (error) {
    console.error(`Failed to register commands with Discord: [${error}]`)
  }
}

module.exports = {
  clientReadyHandler
}