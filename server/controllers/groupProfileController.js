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
    console.log('start:', queryStartTime, 'and end:', queryEndTime);
    delete req.query.startTime;
    delete req.query.endTime;


    GroupProfile.find(req.query)
      .populate({
        path: 'group',
        model: Group,
        select: '_id startTime endTime'
      }) // select start and end time
      .exec(function(err, foundProfiles) {
        if (err) {
          next(err);
        }
        // run
        console.log('found profiles!!!: ', foundProfiles);
        var groupsThatMatch = [];
        var groupProfilesThatMatch = [];
        for (var i = 0; i < foundProfiles.length; i++) {
           // console.log(foundProfiles[i]);
           var groupProfile = foundProfiles[i];
           var group = groupProfile.group;
           // console.log('group start time:', group.startTime, '\ngroup end time: ', group.endTime);
           // console.log('queryStartTime:', queryStartTime, '\nqueryEndTime:', queryEndTime);
           var startTimeDiff = timeDiff(queryStartTime, group.startTime);
           // console.log('start time diff:', startTimeDiff);
           var groupTimeDiff = timeDiff(group.startTime, group.endTime);
           // console.log('group time diff:', groupTimeDiff);
           var queryTimeDiff = timeDiff(queryStartTime, queryEndTime);
           // console.log('query time diff:', queryTimeDiff);
           if ((startTimeDiff + groupTimeDiff) <= queryTimeDiff) {
            // console.log('found a match, pushing id');
            groupsThatMatch.push(group);
            // console.log(groupProfile['_id']);
            groupProfilesThatMatch.push(''+groupProfile['_id']);
           } else {
            // console.log('not a match,', (startTimeDiff + userTimeDiff), 'is larger than query time diff: ', queryTimeDiff);
           }
        }
        // console.log('character profiles ids that match', charProfilesThatMatch);
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
      }); // end of exec
  }
};

exports.findGroupProfileByProfileId = function(req, res, next) {
  var gpid = req.params.gpid;

  console.log('PARAMS:', req.params);
  console.log('GPID:', gpid);
  console.log('BODY:', req.body);

  GroupProfile.find({_id: gpid})
    .exec(function(err, profile) {
      if (err) {
        console.error('error finding group profile by id:', err);
        return;
      }
      res.json(profile);
    });
};

var seedGroupProfiles = function() {
  GroupProfile.find()
    .exec(function(err, profiles) {
      if (err) {
        console.error('error finding group profiles while seeding:', err);
        return;
      } else if (profiles.length) {
        console.log('already group profiles in database');
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
                console.error('Error seeding group profiles into database:', err);
                return;
              }
              console.log('success seeding group profiles');
              return newGroupProfiles;
            });
          });
        }
    });
};

seedGroupProfiles();
