/*
 * Handle rest request for user.
 */
var Q = require('q');
var User = require('../models/userModel');
var CharacterProfile = require('../models/characterProfileModel');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

exports.signinUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  findUser({username: username})
    .then(function(user) {
      if (!user) {
        next(new Error('User does not exist'));
        // TODO: Where should the user be redirected
      } else {
        return user.comparePassword(password)
          .then(function(foundUser) {
            if (foundUser) {
              // TODO: Add authentication check
              // create a session for the user
              // redirect to user profile page
              res.redirect('/');
            } else {
              // Redirect user back to sign in
              res.redirect('/');
            }
          });
      }
    })
};

exports.createUser = function(req, res) {

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
