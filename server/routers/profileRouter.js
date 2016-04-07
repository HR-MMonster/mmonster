/*
 * Handle routes from endpoints.
 */
var profileRouter = require('express').Router();
var userController = require('../controllers/userController');
var groupController = require('../controllers/groupController');

profileRouter
  .route('/user')
  .get(userController.findUsers);

profileRouter
  .route('/user:id')
  .get(userController.findUser)
  .put(userController.updateUser);

profileRouter
  .route('/group')
  .get(groupController.findGroups);

profileRouter
  .route('/group:id')
  .get(groupController.findGroup)
  .put(groupController.updateGroup);


module.exports = profileRouter;