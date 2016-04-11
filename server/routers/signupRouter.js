/**
 * Routes request for signing up.
 */
var signupRouter = require('express').Router();
var userController = require('../controllers/userController');
var groupController = require('../controllers/groupController');

signupRouter
  .route('/user')
  .post(userController.createUser);

signupRouter
  .route('/group')
  .post(groupController.createGroup);

module.exports = signupRouter;