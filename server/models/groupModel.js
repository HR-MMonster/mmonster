var Q = require('q');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10; // required for salt gen
var Schema = mongoose.Schema;


var groupSchema = new Schema({
  groupname: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,

  name: String,
  email: String,
  summary: String,
  photo: String, // will store path to file location
  // group availability
  startTime: Number,
  endTime: Number,

});

groupSchema.methods.comparePasswords = function(passwordAttempt) {
  var savedPassword = this.password;
  // should return a promise that compares passwords
  return Q.promise(function(resolve, reject) {
    bcrypt.compare(passwordAttempt, savedPassword, function(err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

groupSchema.pre('save', function(next) {
  var group = this;
  if (!group.isModified('password')) {
    return next(); // perform next middlewar action on the controller
  }

  bycrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    group.password = hash;
    group.salt = salt;
    next();
  });
});

// export the group model
module.exports = mongoose.model('Group', groupSchema);
