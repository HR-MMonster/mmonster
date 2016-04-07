var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var app = express();

// ROUTES
app.use(express.static('../client/public'));
var profileRouter = require('./routers/profileRouter');
var signinRouter = require('./routers/signinRouter');
var signupRouter = require('./routers/signupRouter');
app.use('/profile', profileRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// SERVER INITIALIZATION
app.listen(port, function(err) {
  if (err) {
    console.log("Error encountered: ", err);
  } else {
    console.log('Server is running on port: ', port);
  }
});

module.exports = app;