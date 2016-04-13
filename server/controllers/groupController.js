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

//TODO: confirm the logic for signin works, may need auth check
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
            util.createSession(req, res, {_id: group._id}); // is this user._id ???
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
  findGroup({groupname: newGroup.groupname})
    .then(function(group) {
      if (group) {
        next(new Error('Group account already exists'));
      } else {
        return createGroup(newGroup);
      }
    })
    .then(function(group) {
      if (!group) {
        next(new Error('Group account not created'));
      } else {
        var groupProfile = {gameName: 'FFXIV', group: group};
        createGroupProfile(groupProfile)
          .then(function(profile) {
            if (!profile) {
              next(new Error('Group profile not created'));
            } else {
              res.status(200).json(group);
            }
          });
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findGroup = function(req, res, next) {
  var group = req.body;
  var id = req.params.gid;

  // console.log('PARAMS:', req.params);
  // console.log('GID:', id);
  // console.log('BODY:', req.body);

  findGroup({_id: id})
    .then(function(group) {
      console.log('found group:', group);
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

  console.log('PARAMS:', req.params);
  console.log('GID:', id);
  console.log('BODY:', req.body);

  Group.findOneAndUpdate({_id: id}, updates)
    .exec(function(err, group) {
      if (err) {
        console.error('error finding group', err);
        next(err);
      }
      res.json(group);  // TODO: this is sending back unupdated object, although updates in DB
    });

  // findGroupAndUpdate({_id: id}, updates)
  //   .then(function(group) {
  //     console.log('found Group:', group);
  //     if (!group) {
  //       next(new Error('group not updated'));
  //     } else {
  //       res.json(group);
  //     }
  //   })
  //   .fail(function(err) {
  //     next(err);
  //   });
};

exports.createGroupProfile= function(req, res, next) {
  var newGroupProfile = req.body;
  var groupID = req.params.gid;

  if (newGroupProfile.group !== groupID) {
    newGroupProfile.group = groupID;
  }
  createGroupProfile(newGroupProfile)
    .then(function(groupProfile) {
      if (!groupProfile) {
        next(new Error('Group profile not created'));
      } else {
        res.json(groupProfile);
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findGroupProfile= function(req, res, next) {
  var groupProfileID = req.params.gpid;
  console.log(req.params);
  findGroupProfile({_id: groupProfileID})
    .then(function(groupProfile) {
      if (!groupProfile) {
        next(new Error('group profile not found'));
      }
      res.json(groupProfile);
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findGroupProfiles= function(req, res, next) {
  // TODO: this maybe unnecessary as there will only be one profile for each group
  var groupID = req.params.gid;
  console.log('PARAMS:', req.params);
  console.log('GID:', groupID);
  console.log('BODY:', req.body);

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

exports.updateGroupProfile= function(req, res, next) {
  var updates = req.body;
  var groupProfileID = req.params.gpid;

  findGroupProfileAndUpdate({_id: groupProfileID}, updates)
    .then(function(updatedGroup) {
      console.log(updatedGroup);
      if (!updatedGroup) {
        next(new Error('group not updated'));
      }
      res.json(updatedGroup);
    })
    .fail(function(err) {
      next(err);
    });
};

var seedGroups = function() {
  Group.find()
    .exec(function(err, groups) {
      if (err) {
        console.error('error seeding groups');
        return;
      } else if (groups.length) {
        console.log('already groups in database');
      } else {
        var groups = dataGen.generateGroups(20);
        Group.create(groups, function(err, groups) {
            if (err) {
              console.error('error seeding groups:', err);
              return;
            }
            return groups;
          });
      }
    });
};

seedGroups();
