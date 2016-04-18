var session = require('express-session');

module.exports.createSession = function(req, res, newUser) {
  req.session.regenerate(function(err) {
    if (err) {
      throw new Error(err);
    }
    req.session.user = newUser._id;
    res.status(200).json(newUser);
  });
};

module.exports.checkUser = function(req, res, next) {
  if (!req.session.user) {
    res.status(401).end();
  } else {
    next();
  }
};

module.exports.restrictUserOwnerOnly = function(req, res, next) {
  if (req.session.user !== req.params.uid) {
    res.status(401).end();
  } else {
    next();
  }
};

module.exports.restrictGroupOwnerOnly = function(req, res, next) {
  if (req.session.user !== req.params.gid) {
    res.status(401).end();
  } else {
    next();
  }
};

module.exports.endSession = function(req, res, next) {
  req.session.destroy();
  res.status(200).end();
};

// TODO: Handle types that are not listed below
module.exports.mimeExtension = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif'
};
