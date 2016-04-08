// Game Schema -- appears to be unnecessary with group & user game profile

var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  name: String,
  users: Array, // stores tuples of [username, user_id] pairs
  groups: Array,// stores tuples of [groupName, group_id] pairs
  // genre: String,
});

module.exports = mongoose.model('games', GameSchema);
