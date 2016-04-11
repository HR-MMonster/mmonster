/*
 * Handle routes from endpoints.
 */
var profileRouter = require('express').Router();
var multer = require('multer');
var userController = require('../controllers/userController');
var groupController = require('../controllers/groupController');
var characterProfileController = require('../controllers/characterProfileController');
var groupProfileController = require('../controllers/groupProfileController');

profileRouter
  .route('/users')
  .get(userController.findUsers);

profileRouter
  .route('/users/:id')
  .get(userController.findUser)
  .put(userController.updateUser);

profileRouter
  .route('/users/:id/characterProfiles')
  .get(userController.findCharacterProfiles)
  .post(userController.createCharacterProfile);

profileRouter
  .route('/users/:id/characterProfiles/:id')
  .get(userController.findCharacterProfile)
  .put(userController.updateCharacterProfile);

profileRouter
  .route('/characterProfiles')
  .get(characterProfileController.findCharacterProfiles);

profileRouter
  .route('/groups')
  .get(groupController.findGroups);

profileRouter
  .route('/groups/:id')
  .get(groupController.findGroup)
  .put(groupController.updateGroup);

profileRouter
  .route('/groups/:id/groupProfile')
  .get(groupController.findGroupProfiles)
  .post(groupController.createGroupProfile);

profileRouter
  .route('/groups/:id/groupProfile/:id')
  .get(groupController.findGroupProfile)
  .put(groupController.updateGroupProfile);

profileRouter
  .route('/groupProfiles')
  .get(groupProfileController.findGroupProfiles);

module.exports = profileRouter;