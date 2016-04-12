/*
 * Handle routes from endpoints.
 */
var profileRouter = require('express').Router();
var userController = require('../controllers/userController');
var groupController = require('../controllers/groupController');
var characterProfileController = require('../controllers/characterProfileController');
var groupProfileController = require('../controllers/groupProfileController');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + '/../../client/uploads/');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.' +  mimeExtension[file.mimetype])
  }
});

var upload = multer({storage: storage});

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
  .route('/users/:id/photos')
  .post(upload.single('userPhoto'), userController.uploadPhoto);


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

mimeExtension = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif'
};

module.exports = profileRouter;