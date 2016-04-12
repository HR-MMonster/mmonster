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
  if (req.session.user) {
    next();
  } else {
    res.status(401).end();
  }
};

module.exports.endSession = function(req, res, next) {
  req.session.destroy();
  res.status(200).end();
};

