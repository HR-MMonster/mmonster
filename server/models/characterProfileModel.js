var mongoose = require('mongoose');
var User = require('./userModel');
var Schema = mongoose.Schema;

var characterProfileSchema = new Schema({
  gameName: {
    type: String,
    required: true
  },
  mic: Boolean, // user has a microphone connection?
  server: String, // should this be game specific?
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  } // should store user reference, look into population with mongoose
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
