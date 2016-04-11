var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var profileRouter = require('./routers/profileRouter');
var signinRouter = require('./routers/signinRouter');
var signupRouter = require('./routers/signupRouter');
var port = process.env.PORT || 8000;
var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/mmonsterdb';
var app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATABASE INITIALIZATION
mongoose.connect(dbUri);

// ROUTES
// handle all other routes
app.use(express.static(__dirname + '/../client'));
app.use('/profile', profileRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

// SERVER INITIALIZATION
app.listen(port, function(err) {
  if (err) {
    console.log("Error encountered: ", err);
  } else {
    console.log('Server is running on port: ', port);
  }
});

module.exports = app;