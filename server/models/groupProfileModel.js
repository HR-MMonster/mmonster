var mongoose = require('mongoose');
var Group = require('./groupModel');
var Schema = mongoose.Schema;

var groupProfileSchema = new Schema({
  gameName: {
    type: String,
    required: true
  },
  server: String,
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
    }, // store group ref, see mongoose data population REQUIRED
});

/*
 *  The rest of the props of the group profile can be passed
 *  in as props of the model object (can be decided on the client side - unopinionated)
 *  This should include properties specific to what the group is looking
 *  for in their ideal candidate that be used to display data on the DOM
 *  or to be queried with to match users gameProfiles.
 */

module.exports = mongoose.model('GroupProfile', groupProfileSchema);
