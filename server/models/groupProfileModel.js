var mongoose = require('mongoose');
var Group = require('./groupModel');
var Schema = mongoose.Schema;
var messageSchema = require('./messageModel').schema;

var groupProfileSchema = new Schema({
  gameName: {
    type: String,
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  summary: String,
  dps: Number,
  serverGroupName: String,
  server: String,
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
  A8S: Boolean,
  messages: [messageSchema],
});

module.exports = mongoose.model('GroupProfile', groupProfileSchema);
