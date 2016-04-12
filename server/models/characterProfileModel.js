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
  // gameOptions: [ffxivSchema], // use a nested structue here
  mic: Boolean, // user has a microphone connection?
  server: String, // should this be game specific?
  user:[userSchema], // should store user reference, look into population with mongoose
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

  /*
   *  The remaining props of the user userProfile
   *  can be passed in as props of the model object at initial save.
   *  This can be decided on the client side and is unopinionated.
   *  Should include properties specific to the game and relevant user attributes,
   *  such as for FFXIV:
   *  { dps     : 78, // damage per second
   *    main    : "Dark Knight",   //
   *    jobs    : ["Warrior", "Time Mage", "Red Mage", "Sage"], // store an array of jobs they can play OR a hash if works better for client side
   *    cleared : {},  // store an object with {levelName1 : boolean, levelName2: boolean, ...}
   *  }
   */

module.exports = mongoose.model('CharacterProfile', characterProfileSchema);
