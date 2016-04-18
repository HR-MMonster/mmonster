/*
 * Handle Rest request for group.
 */
var Q = require('q');
var mongoose = require('mongoose');
var Group = require('../models/groupModel');
var GroupProfile = require('../models/groupProfileModel');
var dataGen = require('../data/testDataTemplates');
var util = require('../lib/utility');

var findGroup = Q.nbind(Group.findOne, Group);
var findGroups = Q.nbind(Group.find, Group);
var findGroupAndUpdate = Q.bind(Group.findOneAndUpdate);
var createGroup = Q.nbind(Group.create, Group);
var findGroupProfile = Q.nbind(GroupProfile.findOne, GroupProfile);
var findGroupProfiles = Q.nbind(GroupProfile.find, GroupProfile);
var findGroupProfileAndUpdate = Q.nbind(GroupProfile.findOneAndUpdate, GroupProfile);
var createGroupProfile = Q.nbind(GroupProfile.create, GroupProfile);

exports.signinGroup = function(req, res, next) {
  var groupname = req.body.groupname;
  var password = req.body.password;

  findGroup({groupname: groupname})
    .then(function(group) {
      if (!group) {
        next(new Error('group does not exist'));
      }
      return group.comparePasswords(password)
        .then(function(foundGroup) {
          if (foundGroup) {
            util.createSession(req, res, {_id: group._id});
          } else {
            res.status(400).end();
          }
        })
    })
    .fail(function(err) {
      next(err);
    });
};

exports.createGroup = function(req, res, next) {
  var newGroup = req.body;

  Group.findOne({groupname: newGroup.groupname})
    .exec(function(err, group) {
      if (err) {
        console.error('<><> Error testing if groupname exists:', err);
        next(err);
      } else if (group) {
        res.send('groupname ' + newGroup.groupname + ' already exists');
      } else {
        Group.create(newGroup, function(err, createdGroup) {
            if (err) {
              console.error('<><> Error creating new group:', err)
              return;
            }
            GroupProfile.create({gameName: 'FFXIV', group: createdGroup._id}, function(err, groupProfile) {
                if (err) {
                  console.error('<><> Error creating generic group profile');
                  return;
                }
                util.createSession(req, res, {_id: createdGroup._id});
              });
          });
      }
    });
};

exports.findGroup = function(req, res, next) {
  var group = req.body;
  var id = req.params.gid;

  findGroup({_id: id}, {password: 0, salt: 0})
    .then(function(group) {
      if (!group) {
        next(new Error('Group', id, 'not found'));
      } else {
        res.json(group);
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findGroups = function(req, res, next) {
  findGroups()
    .then(function(groups) {
      if (!groups) {
        next(new Error('no groups found'));
      } else {
        res.json(groups);
      }
    })
    .fail(function(err) {
      next(err)
    });
};


exports.updateGroup = function(req, res, next) {
  var updates = req.body;
  var id = req.params.gid;

  Group.findOneAndUpdate({_id: id}, updates, {new: true})
    .exec(function(err, group) {
      if (err) {
        console.error('error finding group', err);
        next(err);
      }
      res.json(group);
    });
};

exports.createGroupProfile= function(req, res, next) {
  var newGroupProfile = req.body;
  var gid = req.params.gid;

  if (newGroupProfile.group !== gid) {
    newGroupProfile.group = gid;
  }
  GroupProfile.create(newGroupProfile, function(err, groupProfile) {
      if (err) {
        console.error('error creating group profile');
        return;
      }
      res.json(groupProfile);
    });
};

exports.findGroupProfile= function(req, res, next) {
  var gpid = req.params.gpid;

  GroupProfile.find({_id: gpid})
    .populate({
      path: 'group',
      select: '-password -salt'
    })
    .exec(function(err, groupProfile) {
      if (err) {
        console.error('error finding group profile:', err);
        next(err);
      }
      res.json(groupProfile);
    });
  };

exports.findGroupProfiles = function(req, res, next) {
  var groupID = req.params.gid;

  findGroupProfiles({_id: groupID})
    .then(function(groupProfiles) {
      if (!groupProfiles) {
        next(new Error('group profiles not found'));
      }
      res.json(groupProfiles);
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findGroupProfilesById = function(req, res, next) {
  var groupID = req.params.gid;
  GroupProfile.find({group: groupID})
    .populate({
      path: 'group',
      select: '-password -salt'
    })
    .exec(function(err, foundProfiles) {
      if (err) {
        console.error('<><> Error finding profiles that match by id');
        return;
      }
      res.json(foundProfiles);
    })
};

exports.updateGroupProfile= function(req, res, next) {
  var updates = req.body;
  var gpid = req.params.gpid;

  GroupProfile.findOneAndUpdate({_id: gpid}, updates, {new: true})
    .exec(function(err, profile) {
      if (err) {
        console.error('<><> Error updating group profile:', err);
        return;
      }
      res.json(profile);
    });
};

exports.uploadPhoto = function(req, res, next) {
  var gid = req.params.gid;
  var photoFileDescription = req.file;

  var updates = {photo: '/uploads/' + photoFileDescription.filename};
  Group.findOneAndUpdate({_id: gid}, updates)
    .exec(function(err, group) {
      if (err) {
        console.error('<><> Error adding group photo');
        return;
      }
      res.send(updates);
    });
};


var seedGroups = function() {
  Group.find()
    .exec(function(err, groups) {
      if (err) {
        console.error('<><> Error seeding groups');
        return;
      } else if (groups.length) {
        console.log('<><> Already groups in database');
      } else {
        var groups = dataGen.generateGroups(350);
        Group.create(groups, function(err, groups) {
            if (err) {
              console.error('<><> Error seeding groups:', err);
              return;
            }
            return groups;
          });
      }
    });
};

seedGroups();
