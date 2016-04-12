var mongoose = require('mongoose');
var Group = require('./groupModel').model;
var groupSchema = require('./groupModel').schema
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
  },
  summary: String
});

module.exports = mongoose.model('GroupProfile', groupProfileSchema);
