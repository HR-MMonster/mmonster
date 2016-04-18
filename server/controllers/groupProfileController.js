/**
 * Controller for all group profiles.
 */

var GroupProfile = require('../models/groupProfileModel');
var Group = require('../models/groupModel');
var dataGen = require('../data/testDataTemplates');

var timeDiff = function(start, end) {
  var diff;
  start = +start;
  end = +end;
  if (typeof start !== 'number' || typeof start !== 'number') {
    console.error('Input to timeDiff must be a number. Inputs:', start, end);
    return;
  }
  if (end < start) {
    diff = (23 - start) + end;
  } else {
    diff = end - start;
  }
  return diff;
};

exports.findGroupProfiles = function(req, res, next) {
  console.log(req.query);
  if (req.query.dps) {
    req.query.dps = { $gte: req.query.dps };
  }

  if (!req.query.startTime) {
    console.log(req.query);
    GroupProfile.find(req.query)
      .populate('group')
      .exec(function(err, foundProfiles) {
        res.json(foundProfiles)
      });
  } else {
    // remove start and end time to query only charProfile params
    var queryStartTime = +req.query.startTime;
    var queryEndTime = +req.query.endTime;
    delete req.query.startTime;
    delete req.query.endTime;


    GroupProfile.find(req.query)
      .populate({
        path: 'group',
        model: Group,
        select: '_id startTime endTime'
      })
      .exec(function(err, foundProfiles) {
        if (err) {
          next(err);
        }
        var groupsThatMatch = [];
        var groupProfilesThatMatch = [];
        for (var i = 0; i < foundProfiles.length; i++) {
           var groupProfile = foundProfiles[i];
           var group = groupProfile.group;
           var startTimeDiff = timeDiff(queryStartTime, group.startTime);
           var groupTimeDiff = timeDiff(group.startTime, group.endTime);
           var queryTimeDiff = timeDiff(queryStartTime, queryEndTime);
           if ((startTimeDiff + groupTimeDiff) <= queryTimeDiff) {
            groupsThatMatch.push(group);
            groupProfilesThatMatch.push(''+groupProfile['_id']);
           }
        }
        if (!groupProfilesThatMatch) {
          res.json();
        } else {
          GroupProfile.find({
            '_id': {
              $in: groupProfilesThatMatch
            }
          })
            .populate({
              path: 'group',
              model: Group,
              select: '-password -salt'
            })
            .exec(function(err, foundProfiles) {
            if (err) {
              console.error('problem pulling group profiles by time', err);
            }
            res.json(foundProfiles);
          });
        }
      });
  }
};

exports.findGroupProfileByProfileId = function(req, res, next) {
  var gpid = req.params.gpid;

  GroupProfile.find({_id: gpid})
    .exec(function(err, profile) {
      if (err) {
        console.error('error finding group profile by id:', err);
        return;
      }
      res.json(profile);
    });
};

exports.postMessage = function(req, res, next) {
  var gpid = req.params.gpid;
  var message = req.body.message;

  // make sure user matches user posting message
  if (message.typeId !== req.session.user) {
    message.typeId = req.session.user;
  }

  GroupProfile.update(
    {_id: gpid},
    {'$push': {'messages': message}},
    function(err, numAffected) {
      if (err) {
        console.error('<><> Error adding message');
        return;
      }
      res.send('posted message');
    });
};

var seedGroupProfiles = function() {
  GroupProfile.find()
    .exec(function(err, profiles) {
      if (err) {
        console.error('<><> Error finding group profiles while seeding:', err);
        return;
      } else if (profiles.length) {
        console.log('<><> Already group profiles in database');
      } else {
        Group.find()
          .select('_id')
          .exec(function(err, groupIds) {
            if (err) {
              console.error(err);
              return;
            }
            var newGroupProfiles = dataGen.generateGroupProfiles(groupIds.length, 'FFXIV');
            newGroupProfiles.forEach(function(profile, i) {
              profile.group = groupIds[i];
            });
            GroupProfile.create(newGroupProfiles, function(err, newGroupProfiles) {
              if (err) {
                console.error('<><> Error seeding group profiles into database:', err);
                return;
              }
              console.log('<><> Success seeding group profiles');
              return newGroupProfiles;
            });
          });
        }
    });
};

seedGroupProfiles();
