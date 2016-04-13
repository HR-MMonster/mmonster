/*
 * Routes request for signing in to account
 */
var signinRouter = require('express').Router();
var userController = require('../controllers/userController');

signinRouter
  .route('/')
  .post(userController.signinUser);

module.exports = signinRouter;
