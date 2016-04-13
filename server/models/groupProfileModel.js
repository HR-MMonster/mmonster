var mongoose = require('mongoose');
var Group = require('./groupModel');
var Schema = mongoose.Schema;

var groupProfileSchema = new Schema({
  gameName: {
    type: String,
    required: true
  },
  dps: Number,
  server: String,
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  summary: String,
});

module.exports = mongoose.model('GroupProfile', groupProfileSchema);
