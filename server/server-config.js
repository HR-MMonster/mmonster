var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

var profileRouter = require('./routers/profileRouter');
var signinRouter = require('./routers/signinRouter');
var signupRouter = require('./routers/signupRouter');
var util = require('./lib/utility');

var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/mmonsterdb';
var app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'di noisses sretsnomm',
  resave: false,
  saveUninitialized: false
}));

// DATABASE INITIALIZATION
mongoose.connect(dbUri);

// ROUTES
// handle all other routes
app.use(express.static(__dirname + '/../client'));
app.use('/profile', profileRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/logout', util.endSession);

module.exports = app;