/*
 * Handle Rest request for group.
 */
var Q = require('q');
var mongoose = require('mongoose');
var Group = require('../models/groupModel');
var GroupProfile = require('../models/groupProfileModel');

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
            res.status(200).json(group);
          } else {
            res.status(400).end();
          }
        })
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
  var id = req.params.id;
  findGroup({_id: id})
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
  var id = req.params.id;
  findGroupAndUpdate({_id: id}, updates)
    .then(function(group) {
      if (!group) {
        next(new Error('group not updated'));
      } else {
        res.json(group);
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.createGroupProfile= function(req, res, next) {
  var newGroupProfile = req.body;
  var groupID = req.params.id;

  if (newGroupProfile.user !== userID) {
    newGroupProfile.user = userID;
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
  var groupID = req.params.id;

  findGroupProfile({_id: groupID})
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
  var groupID = req.params.id;

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
  var groupID = req.params.id;

  findGroupProfileAndUpdate({_id: id}, updates)
    .then(function(updatedGroup) {
      if (!updatedGroups) {
        next(new Error('group not updated'));
      }
      res.json(updatedGroup);
    })
    .fail(function(err) {
      next(err);
    });
};

var seedGroups = function(groups) {
  createGroup(groups)
    .then(function(groups) {
      if (!groups) {
        console.error('error seeding groups into database');
        return;
      }
      console.log('success seeding groups into database');
    })
    .fail(function(err) {
      console.error(err);
    });
};
