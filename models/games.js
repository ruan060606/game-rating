const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameSchema = new Schema({
  name: String,
  genre: String,
  rating: String,
  creatorId: String,
});

module.exports = mongoose.model('Games', gameSchema);
