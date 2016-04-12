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
  user:[userSchema],
  mic: Boolean,
  server: String,
  dps: Number,
  main: String,
  paladin: Boolean,
  warrior: Boolean,
  darkKnight: Boolean,
  whiteMage: Boolean,
  scholar: Boolean,
  astrologian: Boolean,
  monk: Boolean,
  dragoon: Boolean,
  ninja: Boolean,
  blackMage: Boolean,
  summoner: Boolean,
  bard: Boolean,
  machinist: Boolean,
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
