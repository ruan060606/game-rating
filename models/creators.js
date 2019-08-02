const mongoose = require('mongoose');

const { Schema } = mongoose;

const creatorSchema = new Schema({
  name: String,
  founded: Number,
  Headquarters: String,
});

module.exports = mongoose.model('Creators', creatorSchema);
