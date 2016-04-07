var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var app = express();

// ROUTES
app.use(express.static('../client/public'));
var profileRouter = require('./routers/profileRoute');
app.use('/profile', profileRouter);

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// SERVER INITIALIZATION
app.listen(port, function(err) {
  console.log('Server is running on port: ', port);
});

module.exports = app;