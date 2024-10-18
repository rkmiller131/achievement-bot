const {
  REST,
  Routes
} = require('discord.js');
const { connectMongoDB } = require('../../database/mongo.service');
// const mongoose = require('mongoose')

const discordAPI = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function clientReadyHandler(client) {
  console.log(`${client.user.tag} is online`);
  await connectMongoDB();
  // await mongoose.connection.dropCollection('servers')

  try {
    const data = await discordAPI.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: client.commands.map((command) => command.data.toJSON()) }
    );
  } catch (error) {
    console.error(`Failed to register commands with Discord: [${error}]`)
  }
}

module.exports = {
  clientReadyHandler
}