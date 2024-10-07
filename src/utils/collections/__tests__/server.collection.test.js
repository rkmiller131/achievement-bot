const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const { mockServer } = require('./db-mocks');

beforeAll(async () => {
  mockingoose(mongoose.model('Server')).toReturn(mockServer);
});
