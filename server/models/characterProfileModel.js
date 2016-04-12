var mongoose = require('mongoose');
var User = require('./userModel').model;
var userSchema = require('./userModel').schema;
var ffxivSchema = require('./ffxivModel').ffxivSchema;
var Schema = mongoose.Schema;

var characterProfileSchema = new Schema({
  gameName: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  mic: Boolean,
  server: String,
  dps: Number,    // damage per second
  summary: String,
  profileLink: String,
  main: String,  // main job
  ign: String, // in game name
  Paladin: Boolean,
  Warrior: Boolean,
  DarkKnight: Boolean,
  WhiteMage: Boolean,
  Scholar: Boolean,
  Astrologian: Boolean,
  Monk: Boolean,
  Dragoon: Boolean,
  Ninja: Boolean,
  BlackMage: Boolean,
  Summoner: Boolean,
  Bard: Boolean,
  Machinist: Boolean,
  T1: Boolean,
  T2: Boolean,
  T3: Boolean,
  T4: Boolean,
  T5: Boolean,
  T6: Boolean,
  T7: Boolean,
  T8: Boolean,
  T9: Boolean,
  T10: Boolean,
  T11: Boolean,
  T12: Boolean,
  T13: Boolean,
  A1S: Boolean,
  A2S: Boolean,
  A3S: Boolean,
  A4S: Boolean,
  A5S: Boolean,
  A6S: Boolean,
  A7S: Boolean,
  A8S: Boolean
});

module.exports = mongoose.model('CharacterProfile', characterProfileSchema);
