/*
 * Routes request for signing in to account
 */
var signinRouter = require('express').Router();
var userController = require('../controllers/userController');
var groupController = require('../controllers/groupController');

signinRouter
  .route('/user')
  .post(userController.signinUser);

// TODO:
signinRouter
  .route('/group')
  .post(groupController.signinGroup);

module.exports = signinRouter;
