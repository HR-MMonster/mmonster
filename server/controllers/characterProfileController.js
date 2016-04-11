/**
 * Controller for all gamer profiles.
 */
var User = require('../models/userModel');
var CharacterProfile = require('../models/characterProfileModel');
var testData = require('../data/testData').characterProfiles;


exports.findCharacterProfiles = function(req, res, next) {
  // findAll
  // console.log(req.query);
  var userParams = {
    path: 'user',
    select: '-password -salt',
    match: {}
  };

  if (req.query.dps) {
    req.query.dps = {$gt: req.query.dps};
  }

  if (req.query.startTime) {
    userParams.match.startTime = {$gte: req.query.startTime};
    delete req.query.startTime;
  }

  if (req.query.endTime) {
    userParams.match.endTime = {$lte: req.query.endTime};
    delete req.query.endTime;
  }
  // check searchParams for a startTime and endTime
  // iinput these params into the populate
    // take care of overlap of midnight

  var searchParams = req.query;

  CharacterProfile.find(searchParams)
  .populate(userParams)
  .exec(function(err, foundProfiles) {
    if (err) {
      console.error('><>< Error quering database for charProfiles:', err, '<><>');
    } else {
      res.send(200, foundProfiles);
    }
  });
};


// Helps to seed database for testing:
var seedDatabase = function(data) {
  CharacterProfile.create(data, function(err, newCharProfiles) {
    if (err) {
      console.error('><>< Error seeding database with char profiles:', err);
      return;
    }
    console.log('><>< Success seeding database');
  });
};

// seedDatabase(testData);
