/*
 * Handle rest request for user.
 */
var Q = require('q');
var User = require('../models/userModel');
var CharacterProfile = require('../models/characterProfileModel');
var util = require('../lib/utility');
var dataGen = require('../data/testDataTemplates');

var findUser = Q.nbind(User.findOne, User);
var findUsers = Q.nbind(User.find, User);
var findUserAndUpdate = Q.nbind(User.findOneAndUpdate, User);
var createUser = Q.nbind(User.create, User);
var findCharacterProfile = Q.nbind(CharacterProfile.findOne, CharacterProfile);
var findCharacterProfiles = Q.nbind(CharacterProfile.find, CharacterProfile);
var findCharacterProfileAndUpdate = Q.nbind(CharacterProfile.findOneAndUpdate, CharacterProfile);
var createCharacterProfile = Q.nbind(CharacterProfile.create, CharacterProfile);


exports.signinUser = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  findUser({username: username})
    .then(function(user) {
      if (!user) {
        next(new Error('User does not exist'));
        // TODO: Where should the user be redirected
      } else {
        return user.comparePasswords(password)
          .then(function(foundUser) {
            if (foundUser) {
              util.createSession(req, res, {_id: user._id});
            } else {
              res.status(400).end('User account password incorrect');
            }
          });
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.createUser = function(req, res, next) {
  var newUser = req.body;

  findUser({username: newUser.username})
    .then(function(found) {
      if (found) {
        next(new Error('User already exists"'));
        // TODO: Alert client that user exists
      } else {
        return createUser(newUser);
      }
    })
    .then(function(user) {
      if (!user) {
        next(new Error('User account not created'));
        // TODO: Alert client that the account was not created
      } else {
        // A generic FFIV character profile is created for a new user
        var characterProfile = {gameName: 'FFXIV', user: user._id};
         createCharacterProfile(characterProfile)
         .then(function(profile) {
           if (!profile) {
             next(new Error('Character profile not created'));
           } else {
             util.createSession(req, res, {_id: user._id});
           }
         });
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findUser = function(req, res, next) {
  var user = req.body;
  var userID = req.params.uid;
  findUser({_id: userID})
    .then(function(user) {
      if (!user) {
        next(new Error('User ' + userID + ' not found'));
      } else {
        res.json(user);
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findUsers = function(req, res, next) {
  findUsers()
    .then(function(users) {
      if (!users) {
        next(new Error('No users found'));
      } else {
        res.json(users);
      }
    })
    .fail(function(err) {
      next(err);
    });
};

/*
 * Update the user using the passed parameters.
 * @returns the old user upon success.
 */
exports.updateUser = function(req, res, next) {
  var updates = req.body;
  var userID = req.params.uid;
  findUserAndUpdate({_id: userID}, updates)
    .then(function (user) {
    if (!user) {
      next( new Error('User not found'));
    } else {
      res.json(user);
    }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.createCharacterProfile = function(req, res, next) {
  var characterProfile = req.body;
  var userID = req.params.uid;
  if (characterProfile.user !== userID) {
    characterProfile.user = userID;
  }
  createCharacterProfile(characterProfile)
    .then(function(profile) {
      if (!profile) {
        next(new Error('Character profile not created'));
      } else {
        res.json(profile);
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findCharacterProfile = function(req, res, next) {
  var characterID= req.params.cpid;
  findCharacterProfile({_id: characterID})
    .then(function(profile) {
      if (!profile) { //TODO: Check to verify that a response is sent to the client
        next(new Error('No character profiles'));
      } else {
        res.json(profile);
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findCharacterProfiles = function(req, res, next) {
  var userID = req.params.uid;

  findCharacterProfiles({user: userID})
    .then(function(profiles) {
      if (!profiles) { //TODO: Check to verify that a response is sent to the client
        next(new Error('No character profiles for user ' + userID));
      } else {
        res.json(profiles);
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.updateCharacterProfile = function(req, res, next) {
  var characterID = req.params.cpid;
  var updates = req.body;

  findCharacterProfileAndUpdate({_id: characterID}, updates)
    .then(function(profile) {
      if (!profile) {
        next( new Error('Character profile not found'));
      } else {
        res.json(profile);
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.uploadPhoto = function(req, res, next) {
  var userID = req.params.uid;
  var photoFileDescription = req.file;

  // TODO: Determine file type and save correct extension
  var updates = {photo: '/uploads/' + photoFileDescription.filename};
  findUserAndUpdate({_id: userID}, updates)
    .then(function(profile) {
      if (!profile) {
        next(new Error('No user profile found for user ' + userID));
      } else {
        res.json(updates);
      }
    });
};

var seedUsers = function() {
  User.find()
    .exec(function(err, users) {
      if (err) {
        console.error(err);
        return;
      } else if (users.length) {
        console.log('already users in database');
      } else {
        var newUsers = dataGen.generateUsers(20);
        User.create(newUsers, function(err, users) {
          if (err) {
            console.error('<><> Error seeding users:', err);
            return;
          }
          console.log('<><> success seeding users');
          // seedCharProfiles(testCharProfiles);
        });
      }
    })
};

seedUsers();
