/*
 * Handle rest request for user.
 */
var Q = require('q');
var User = require('../models/userModel');
var CharacterProfile = require('../models/characterProfileModel');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

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

};

exports.findUsers = function(req, res) {

};

exports.updateUser = function(req, res) {

};

exports.createCharacterProfile = function(req, res) {

};

exports.findCharacterProfile = function(req, res) {

};

exports.findCharacterProfiles = function(req, res) {

};

exports.updateCharacterProfile = function(req, res) {

};
