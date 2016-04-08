/*
 * Handle routes from endpoints.
 */
var profileRouter = require('express').Router();
var userController = require('../controllers/userController');
var groupController = require('../controllers/groupController');
var gamerProfileController = require('../controllers/gamerProfileController');
var groupProfileController = require('../controllers/groupProfileController');

profileRouter
  .route('/users')
  .get(userController.findUsers);

profileRouter
  .route('/users/:id')
  .get(userController.findUser)
  .put(userController.updateUser);

profileRouter
  .route('/users/:id/gamerProfiles')
  .get(userController.findGamerProfiles)
  .post(userController.createGamerProfile);

profileRouter
  .route('/users/:id/gamerProfiles/:id')
  .get(userController.findGamerProfile)
  .put(userController.updateGamerProfile);

profileRouter
  .route('/gamerProfiles')
  .get(gamerProfileController.findGamerProfiles);

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