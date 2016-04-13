/**
 * Controller for all group profiles.
 */

var GroupProfile = require('../models/groupProfileModel');
var Group = require('../models/groupModel');
var dataGen = require('../data/testDataTemplates');

exports.findGroupProfiles = function(req, res, next) {
  GroupProfile.find(req.params)
    .populate('group')
    .exec(function(err, groups) {
      if (err) {
        next(err);
      }
      res.send(200, groups);
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
            });
          });
        }
    });
};

seedGroupProfiles();
