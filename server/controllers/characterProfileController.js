/**
 * Controller for all gamer profiles.
 */
var User = require('../models/userModel');
var CharacterProfile = require('../models/characterProfileModel');
var testData = require('../data/testData').characterProfiles;


exports.findCharacterProfiles = function(req, res, next) {
  // find by query parameters
  console.log(req.query);
  if (req.query.dps) {
    req.query.dps = { $gt: req.query.dps };
  }
  // console.log(req.query.startTime);
  // if (req.query.startTime) {
  //   req.query.user.startTime = {$gt: req.query.user.startTime};
  // }
  // if (req.query.user.endTime) {
  //   req.query.user.endTime = {$lt: req.query.user.endTime};
  // }

  if (!req.query.startTime) {
    CharacterProfile.find(req.query)
      .exec(function(err, foundProfiles) {
        if (err) {
          console.error('><>< Error querying database for charProfiles:', err, '<><>');
        } else {
          res.send(200, foundProfiles);
        }
    });
  } else {
    var startTime = +req.query.startTime;
    var endTime = +req.query.endTime;
    console.log('start:', startTime, 'and end:', endTime);
    delete req.query.startTime;
    delete req.query.endTime;
    CharacterProfile.find(req.query)
      .and({
        'user.startTime': {$gte: startTime},
        'user.endTime': {$lte: endTime}
      })
      // .where({endTime: {$lte: endTime}})
      .exec(function(err, foundProfiles) {
        if (err) {
          console.error('><>< Error querying database for charProfiles:', err, '<><>');
        } else {
          res.send(200, foundProfiles);
        }
      });
  }
};

  // req.query.user.startTime = {$gte: startTime};
  // req.query.user.endTime = {$lte: endTime};

  // console.log(req.query.user);

  // if (req.query.endTime) {
  //   var endTime = req.query.endTime;
  // }


  // if (req.query.startTime && req.query.endTime) {
  //   // userParams.match = {$and: [{ startTime: { $gte: +req.query.startTime } }, { endTime: { $lte: +req.query.endTime } }]};
  //   startTime = req.query.startTime;
  //   endTime = req.query.endTime;
  //   delete req.query.startTime;
  //   delete req.query.endTime;
  // }

  // check searchParams for a startTime and endTime
  // iinput these params into the populate
  //   take care of overlap of midnight




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
