require('dotenv').config();
const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      autoIndex: true
    });
    console.log('Connected to database');
  } catch (error) {
    console.error('Error with database connection: ', error);
  }
}

module.exports = {
  connectMongoDB
}


