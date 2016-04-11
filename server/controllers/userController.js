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
var createCharacterProfile;

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
              res.redirect('/');
            } else {
              // Redirect user back to sign in
              res.redirect('/');
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
        res.redirect('/');
        //res.redirect('/signin');
        //TODO: Confirm route for signin
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
  findUserAndUpdate({_id: id}, updates).then(function (user) {
    if (!user) {
      next( new Error('User not found'));
    } else {
      res.json(user);
    }
  })
};

exports.createCharacterProfile = function(req, res) {
  var characterProfile = req.body;
  var userID = req.params.id;
  if (characterProfile.user !== userID) {
    characterProfile.user = userID;
  }

};

exports.findCharacterProfile = function(req, res) {

};

exports.findCharacterProfiles = function(req, res) {

};

exports.updateCharacterProfile = function(req, res) {

};
