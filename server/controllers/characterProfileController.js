/**
 * Controller for all gamer profiles.
 */
var User = require('../models/userModel');
var CharacterProfile = require('../models/characterProfileModel');
var testData = require('../data/testData').characterProfiles;


exports.findCharacterProfiles = function(req, res, next) {
  // findAll
  console.log(req.query);
  var userParams = {
    path: 'user',
    select: '-password -salt',
    match: {}
  };
  var startTime = null;
  var endTime = null;

  if (req.query.dps) {
    req.query.dps = {$gte: req.query.dps};
  }

  if (req.query.startTime && req.query.endTime) {
    // userParams.match = {$and: [{ startTime: { $gte: +req.query.startTime } }, { endTime: { $lte: +req.query.endTime } }]};
    startTime = req.query.startTime;
    endTime = req.query.endTime;
    delete req.query.startTime;
    delete req.query.endTime;
  }

  // check searchParams for a startTime and endTime
  // iinput these params into the populate
  //   take care of overlap of midnight

  var searchParams = req.query;

  CharacterProfile.find(searchParams)
  .populate(userParams)
  // .where(user.startTime).gt(startTime)
  // .where(user.endTime).lt(endTime)
  .and([{ 'user.startTime': { $gte: +startTime } }, { 'user.endTime': { $lte: +endTime } }])
  .exec(function(err, foundProfiles) {
    if (err) {
      console.error('><>< Error querying database for charProfiles:', err, '<><>');
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

seedDatabase(testData);
