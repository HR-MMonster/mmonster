var app = require('./server-config.js');

var port = process.env.PORT || 8000;

// SERVER INITIALIZATION
app.listen(port, function(err) {
  if (err) {
    console.log("Error encountered: ", err);
  } else {
    console.log('Server is running on port: ', port);
  }
});