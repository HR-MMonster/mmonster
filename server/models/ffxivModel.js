var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ffxivSchema = new Schema({
  dps: Number,
  main: String,  // IDEA: we should validate strings coming in, at least emails, toLowerCase
  jobs: String, // need to convert input into a String with JSON stringify,
  cleared: String, // maybe for jobs and clered, store array and convert to data structure needed on the client side to make querying possible
});

exports.ffxivSchema = ffxivSchema;

exports.ffxivModel = mongoose.model('ffxivModel', ffxivSchema);

/*
      dps     : 45, // damage per second
      main    : "Fucker",   //
      jobs    : {
        "Warrior": true,
        "Time Mage": false,
        "Red Mage": false,
        "Sage": true
      }, // store an array of jobs they can play
      cleared : {
        A1S: true,
        A2S: true,
        A3S: false,
        A4S: false,
      },
*/
