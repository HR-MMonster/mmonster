/**
 * Controller for all gamer profiles.
 */
var User = require('../models/userModel').model;
var CharacterProfile = require('../models/characterProfileModel');
var testData = require('../data/testData').characterProfiles;

var timeDiff = function(start, end) {
  var diff;
  start = +start;
  end = +end;
  if (typeof start !== 'number' || typeof start !== 'number') {
    console.error('Input must be a number:', start, end);
  }
  if (end < start) {
    diff = (23 - start) + end;
  } else {
    diff = end - start;
  }
  return diff;
};

exports.findCharacterProfiles = function(req, res, next) {
  // find by query parameters
  console.log(req.query);
  if (req.query.dps) {
    req.query.dps = { $gte: req.query.dps };
  }

  // if startTime is defined
  //
  if (!req.query.startTime) {
    CharacterProfile.find(req.query)
      .populate('user')
      .exec(function(err, foundProfiles) {
        res.json(foundProfiles)
      });
  } else {
    // remove start and end time to query only charProfile params
    var queryStartTime = +req.query.startTime;
    var queryEndTime = +req.query.endTime;
    console.log('start:', queryStartTime, 'and end:', queryEndTime);
    delete req.query.startTime;
    delete req.query.endTime;


    CharacterProfile.find(req.query)
      .populate({
        path: 'user',
        model: User,
        select: '_id startTime endTime'
      }) // select start and end time
      .exec(function(err, foundProfiles) {
        if (err) {
          next(err);
        }
        // run
        console.log('found profiles!!!: ', foundProfiles);
        var usersThatMatch = [];
        var charProfilesThatMatch = [];
        for (var i = 0; i < foundProfiles.length; i++) {
           // console.log(foundProfiles[i]);
           var charProfile = foundProfiles[i];
           var user = charProfile.user;
           console.log('user start time:', user.startTime, '\nuser end time: ', user.endTime);
           console.log('queryStartTime:', queryStartTime, '\nqueryEndTime:', queryEndTime);
           var startTimeDiff = timeDiff(queryStartTime, user.startTime);
           console.log('start time diff:', startTimeDiff);
           var userTimeDiff = timeDiff(user.startTime, user.endTime);
           console.log('user time diff:', userTimeDiff);
           var queryTimeDiff = timeDiff(queryStartTime, queryEndTime);
           console.log('query time diff:', queryTimeDiff);
           if ((startTimeDiff + userTimeDiff) <= queryTimeDiff) {
            console.log('found a match, pushing id');
            usersThatMatch.push(user);
            console.log(charProfile['_id']);
            charProfilesThatMatch.push(''+charProfile['_id']);
           } else {
            console.log('not a match,', (startTimeDiff + userTimeDiff), 'is larger than query time diff: ', queryTimeDiff);
           }
        }
        console.log('character profiles ids that match', charProfilesThatMatch);
        if (!charProfilesThatMatch) {
          res.json();
        } else {
          CharacterProfile.find({
            '_id': {
              $in: charProfilesThatMatch
            }
          })
            .populate({
              path: 'user',
              model: User,
              select: '-password -salt'
            })
            .exec(function(err, foundProfiles) {
            if (err) {
              console.error('problem pulling profiles by time', err);
            }
            res.json(foundProfiles);
          });
        }
      }); // end of exec
  } // end of if else

};

// Helps to seed database for testing:
var seedDatabase = function(data) {
  CharacterProfile.create(data, function(err, newCharProfiles) {
    if (err) {
      console.error('><>< Error seeding database with char profiles:', err);
      return;
    }
    console.log('><>< Success seeding char profiles');
  });
};

// seedDatabase(testData);
  //         User.find(foundProfiles)
  //           .and({
  //         'startTime': {$lte: startTime},
  //         'endTime': {$gte: endTime}
  //        })
  //         .select('_id')
  //         .exec(function(err, foundUsers) {
  //           if (err) {
  //             next(err);
  //           }
  //           CharacterProfile.find(foundUsers)
  //             .populate('user')
  //             .exec(function(err, finalProfiles) {
  //               res.json(finalProfiles);
  //             })
  //         })
  //       });
  //     } else {
  //       CharacterProfile.find(req.query)
  //         .populate('user')
  //         .select('_id')
  //         .exec(function(err, foundProfiles) {
  //           if (err) {
  //             next(err);
  //           }
  //           User.find(foundProfiles)
  //             .and({
  //           'startTime': {$gte: startTime},
  //           'endTime': {$lte: endTime}
  //          })
  //           .select('_id')
  //           .exec(function(err, foundUsers) {
  //             if (err) {
  //               next(err);
  //             }
  //             CharacterProfile.find(foundUsers)
  //               .populate('user')
  //               .exec(function(err, finalProfiles) {
  //                 res.json(finalProfiles);
  //               })
  //           })
  //         });
  //     }
  // }

  // if (startTime <= endTime) {
  //   CharacterProfile.find(req.query)
  //     .populate('user')
  //     .and({
  //       'user.startTime': {$gte: startTime},
  //       'user.endTime': {$lte: endTime}
  //     })
  //     // .where({endTime: {$lte: endTime}})
  //     .exec(function(err, foundProfiles) {
  //       if (err) {
  //         next(err);
  //       } else {
  //         res.send(200, foundProfiles);
  //       }
  //     });
  //   }
