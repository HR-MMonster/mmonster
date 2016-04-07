/**
 * Routes request for signing up.
 */
var signupRouter = require('express').Router();
var userController = require('../controllers/userController');

signupRouter
  .route('/')
  .post(userController.createUser);

module.exports = signupRouter;