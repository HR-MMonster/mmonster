/**
 * Controller for all gamer profiles.
 */
var User = require('../models/userModel');
var CharacterProfile = require('../models/characterProfileModel');
var dataGen = require('../data/testDataTemplates');

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
  if (req.query.dps) {
    req.query.dps = { $gte: req.query.dps };
  }

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
    delete req.query.startTime;
    delete req.query.endTime;

    CharacterProfile.find(req.query)
      .populate({
        path: 'user',
        model: User,
        select: '_id startTime endTime'
      })
      .exec(function(err, foundProfiles) {
        if (err) {
          next(err);
        }
        var usersThatMatch = [];
        var charProfilesThatMatch = [];
        for (var i = 0; i < foundProfiles.length; i++) {
           var charProfile = foundProfiles[i];
           var user = charProfile.user;
           var startTimeDiff = timeDiff(queryStartTime, user.startTime);
           var userTimeDiff = timeDiff(user.startTime, user.endTime);
           var queryTimeDiff = timeDiff(queryStartTime, queryEndTime);
           if ((startTimeDiff + userTimeDiff) <= queryTimeDiff) {
            usersThatMatch.push(user);
            charProfilesThatMatch.push(''+charProfile['_id']);
           }
        }
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
      });
  }
};

exports.findCharacterProfileByProfileId = function(req, res, next) {
  var cpid = req.params.cpid;

  CharacterProfile.find({_id: cpid})
    .exec(function(err, profile) {
      if (err) {
        console.error('error finding char profile by id:', err);
        return;
      }
      res.json(profile);
    });
};

exports.postMessage = function(req, res, next) {
  var cpid = req.params.cpid;
  var message = req.body.message;

  // make sure user matches user posting message
  if (message.typeId !== req.session.user) {
    message.typeId = req.session.user;
  }

  CharacterProfile.update(
    {_id: cpid},
    {'$push': {'messages': message}},
    function(err, numAffected) {
      if (err) {
        console.error('<><> Error adding message');
        return;
      }
      res.send('posted message to ' + cpid);
    });
};

// Seeds database for testing:
var seedCharProfiles = function() {
  CharacterProfile.find()
    .exec(function(err, profiles) {
      if (err) {
        console.error(err);
        return;
      } else if (profiles.length) {
        console.log('<><> Already char profiles in the database')
      } else {
        User.find()
          .select('_id')
          .exec(function(err, userIds) {
            var newCharProfiles = dataGen.generateCharProfiles(userIds.length, 'FFXIV');
            newCharProfiles.forEach(function(profile, i) {
              profile.user = userIds[i];
            });
            CharacterProfile.create(newCharProfiles, function(err, newCharProfiles) {
              if (err) {
                console.error('<><> Error seeding database with char profiles:', err);
                return;
              }
              console.log('<><> Success seeding char profiles');
              return newCharProfiles;
              });
            });
        }
    });
};

seedCharProfiles();

