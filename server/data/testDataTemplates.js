var users = [
  {
    "username"    : "grandMage",
    "password"    : "7gjk84njk",  // stores hash
    "name"        : "Travis",
    "email"       : "travis@me.com",
    "summary"     : "I like dogs and long walks on the beach",
    "startTime"   : 22, // num from 0-23, account for different time zones
    "endTime"     : 3,  // num from 0-23
  },


];

var groups = [
  {
    "groupname"    : "mmonsteeeers",
    "password"    : "hdyldhgj883",  // stores hash
    "name"        : "Colin",
    "email"       : "colin@me.com",
    "summary"     : "Play or be played",
    "startTime"   : 16, // num from 0-23, account for different time zones
    "endTime"     : 2,  // num from 0-23
  },
];

var charProfile_v2 = {
  gameName    : "FFIVX",
  dps     : 78, // damage per second
  main    : "Dark Knight",   //
  jobs    : {
    "Warrior": true,
    "Time Mage": false,
    "Red Mage": false,
    "Sage": true
  }, // store an array of jobs they can play
  cleared : {
    A1S: true,
    A2S: true,
    A3S: true,
    A4S: false,
  },  // store an object or array ? with {levelName : boolean}
  mic     : true,
  server  : "Tonberry"
};

var charProfile_v2 = {
  gameName    : "FFIVX",
  dps     : 78, // damage per second
  main    : "Dark Knight",   //
  jobs    : {
    "Warrior": true,
    "Time Mage": false,
    "Red Mage": false,
    "Sage": true
  }, // store an array of jobs they can play
  cleared : {
    A1S: true,
    A2S: true,
    A3S: true,
    A4S: false,
  },  // store an object or array ? with {levelName : boolean}
  mic     : true,
  server  : "Tonberry"
};
// most important queries:
  // time available to play
  // job
  // DPS ??? is dps by job?
  // all available to play for a given job???
