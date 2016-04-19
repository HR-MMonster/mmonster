var expect = require('chai').expect;
var app = require('../server-config');
var superagent = require('superagent');
var User = require('../models/userModel');
var CharacterProfile = require('../models/characterProfileModel');

describe('server', function() {
  var server;
  var BASE_URL = 'http://localhost:3000/';
  var userID = null;
  before(function(done) {
    server = app.listen(3000);
    done();
  });

  after(function() {
    server.close();
  });

  it('should fetch the index page for /', function(done) {
    superagent.get(BASE_URL, function(err, res) { // Remove test user if in database
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.text).to.contain("ng-app");
      done();
    });
  });

  describe('User creation and signing in:', function(done) {
    before(function(done) {
      User.findOneAndRemove({username: 'test'}, function(err, user) {
        // TODO: Remove a user if needed
      });
      done();
    });

    it('should sign-up a new user', function(done) {
      var newUser = {
        username: 'test',
        password: 'test'
      };
      superagent
        .post(BASE_URL + 'signup/user')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          User.findOne({username: 'test'}, function(err, user) {
            expect(user).to.not.be.null;
            expect(user.username).to.equal('test');
            // Get user id from newly created user
            userID = user._id;
            done();
          });
        });
    });
    it('should not sign-in the newly created user because password is incorrect', function(done) {
      superagent
        .post(BASE_URL + 'signin/user')
        .send({username: 'test', password: 'testWrong'})
        .end(function(err, res) {
          expect(res.badRequest).to.be.true;
          done();
        });
    });
    it('should sign-in the newly created user', function(done) {
      superagent
        .post(BASE_URL + 'signin/user')
        .send({username: 'test', password: 'test'})
        .end(function(err, res) {
          expect(res.status).to.be.ok;
          done();
        });
    });
  });

  describe('user profiles', function() {
    var characterProfileID = null;
    after(function(done) {
      if (characterProfileID) {
        CharacterProfile.findOneAndRemove({_id: characterProfileID}, function (err, profile) {
          //
        });
      }
      done();
    });
    it('should get multiple users', function(done) {
      superagent.get(BASE_URL + 'profile/users')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res.body.length).to.be.above(3);
          done();
        });
    });

    xit('should be able to post a new character profile to a user', function(done) {
      // TODO: Requires a session authentication to post
      var newCharacterProfile = {
        gameName: 'testGame'
      };
      superagent.post(BASE_URL + 'profile/users/' + userID + '/characterProfiles')
        .send(newCharacterProfile)
        .end(function(err, res) {
          var characterProfile = res.body;
          expect(characterProfile).to.not.be.null;
          CharacterProfile.findOne({_id: characterProfile._id}, function(err, profile) {
            expect(profile.gameName).to.equal('testGame');
            characterProfileID = characterProfile._id;
            done();
          });
        });
    });

    it('should NOT be able to post a new character profile to a user', function(done) {
      var newCharacterProfile = {
        gameName: 'testGame2'
      };
      superagent.get(BASE_URL + '/logout');
      superagent.post(BASE_URL + 'profile/users/' + userID + '/characterProfiles')
        .send(newCharacterProfile)
        .end(function(err, res) {
          expect(res.unauthorized).to.be.true;
          CharacterProfile.findOne({gameName: 'testGame2'}, function(err, profile) {
            expect(profile).to.be.null;
            done();
          });
        });
    });

  });
});
