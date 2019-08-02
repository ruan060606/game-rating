const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: String,
  password: String,
  platform: String,
});

module.exports = mongoose.model('Users', userSchema);
