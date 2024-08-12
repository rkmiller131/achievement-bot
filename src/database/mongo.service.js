require('dotenv').config();
const mongoose = require('mongoose');

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      autoIndex: true
    });
    console.log('Connected to database');
  } catch (error) {
    console.error('Error with database connection: ', error);
  }
}

async function disconnectMongoDB() {
  await mongoose.disconnect();
  console.log('Disconnected from database');
}

module.exports = {
  connectMongoDB,
  disconnectMongoDB
}


