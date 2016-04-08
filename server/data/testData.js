var users = [
  {
    "username"    : "grandMage",
    "password"    : "7gjk84njk",  // stores hash
    "salt"        : "salt",
    "startTime"   : 22, // num from 0-23, account for different time zones
    "endTime"     : 3,  // num from 0-23
    "gameProfiles": [
      {}
    ],

  }
];

var gameProfile = {
  dps     : 78, // damage per second
  main    : "Dark Knight",   //
  jobs    : ["Warrior", "Time Mage", "Red Mage", "Sage"], // store an array of jobs they can play
  cleared : {},  // store an object or array ? with {levelName : boolean}
  mic     : true,
};


module.exports = users;

// most important queries:
  // time available to play
  // job
  // DPS ??? is dps by job?
  // all available to play for a given job???
