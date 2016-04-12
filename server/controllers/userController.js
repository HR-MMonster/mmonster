/*
 * Handle rest request for user.
 */
var Q = require('q');
var User = require('../models/userModel');
var CharacterProfile = require('../models/characterProfileModel');

var findUser = Q.nbind(User.findOne, User);
var findUsers = Q.nbind(User.find, User);
var findUserAndUpdate = Q.nbind(User.findOneAndUpdate, User);
var createUser = Q.nbind(User.create, User);
var findCharacterProfile = Q.nbind(CharacterProfile.findOne, CharacterProfile);
var findCharacterProfiles = Q.nbind(CharacterProfile.find, CharacterProfile);
var findCharacterProfileAndUpdate = Q.nbind(CharacterProfile.findOneAndUpdate, CharacterProfile);
var createCharacterProfile = Q.nbind(CharacterProfile.create, CharacterProfile);

var testUsers = require('../data/testData').users;
var testCharProfiles = require('../data/testData').characterProfiles;
var seedCharProfiles = CharacterProfile.seedCharProfiles;
// console.log(testUsers);

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
              // TODO: Add authentication check
              // create a session for the user
              // redirect to user profile page
              res.status(200).json(user);
            } else {
              // Redirect user back to sign in
              res.status(400).end();
              //TODO: Confirm route for signin
              // res.redirect('/signin');
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
        // TODO: Alert client that the accont was not created
      } else {
        // A generic FFIV character profile is created for a new user
        var characterProfile = {gameName: 'FFXIV', user: user._id};
         createCharacterProfile(characterProfile)
         .then(function(profile) {
           if (!profile) {
             next(new Error('Character profile not created'));
           } else {
            // res.redirect('/');
             //res.redirect('/signin');
             res.status(200).json(user);
             //TODO: Confirm route for signin
           }
         });
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findUser = function(req, res) {
  var user = req.body;
  var id = req.params.id;
  findUser({_id: id})
    .then(function(user) {
      if (!user) {
        next(new Error('User ' + id + ' not found'));
      } else {
        res.json(user);
      }
    })
    .fail(function(err) {
      next(err);
    });
};

exports.findUsers = function(req, res) {
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
exports.updateUser = function(req, res) {
  var updates = req.body;
  var id = req.params.id;
  findUserAndUpdate({_id: id}, updates)
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

exports.createCharacterProfile = function(req, res) {
  var characterProfile = req.body;
  var userID = req.params.id;
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

exports.findCharacterProfile = function(req, res) {
  var characterID= req.params.id;

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

exports.findCharacterProfiles = function(req, res) {
  var userID = req.params.id;

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

exports.updateCharacterProfile = function(req, res) {
  var characterID = req.params.id;
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

exports.uploadPhoto = function(req, res) {
  var userID = req.params.id;
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

var seedUsers = function(users) {
  User.create(users, function(err, users) {
    if (err) {
      console.error('<><> Error seeding users:', err);
      return;
    }
    console.log('<><> success seeding users');
    seedCharProfiles(testCharProfiles);
  });
};

// seedUsers(testUsers);
