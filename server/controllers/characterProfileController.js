/**
 * Controller for all gamer profiles.
 */
var User = require('../models/userModel');
var CharacterProfile = require('../models/characterProfileModel');
var testData = require('../data/testData').characterProfiles;

exports.findCharacterProfiles = function(req, res, next) {
  var searchParams = req.body;

  CharacterProfile.find(searchParams).exec(function(err, foundProfiles) {
    if (err) {
      console.error('><>< Error quering database for charProfiles:', err, '<><>');
    } else {
      res.send(200, foundProfiles);
    }
  });
};

// Helps to seed database for testing:
var seedDatabase = function(data) {
  CharacterProfile.create(data, function(err, newCharProfiles) {
    if (err) {
      console.error('><>< Error seeding database with char profiles:', err);
      return;
    }
    conosle.log('><>< Success seeding database');
  });
};

seedDatabase(testData);
