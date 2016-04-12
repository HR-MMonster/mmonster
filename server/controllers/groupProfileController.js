/**
 * Controller for all group profiles.
 */

var GroupProfile = require('../models/groupProfileModel');
var Group = require('../models/groupModel').model;

exports.findGroupProfiles = function(req, res, next) {
  GroupProfile.find(req.params)
    .exec(function(err, groups) {
      if (err) {
        next(err);
      }
      res.send(200, groups);
    });
};

var seedGroupProfiles = function(groupProfiles) {
  GroupProfile.create(groupsProfiles, function(err, newGroupProfiles) {
    if (err) {
      console.error('Error seeding group profiles into database');
      return;
    }
    console.log('success seeding groups');
  })
};
