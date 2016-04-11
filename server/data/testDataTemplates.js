var userTemplate = {
    "username"    : "grandMage",
    "password"    : "7gjk84njk",  // stores hash
    "name"        : "Travis",
    "email"       : "travis@me.com",
    "summary"     : "I like dogs and long walks on the beach",
    "startTime"   : 22, // num from 0-23, account for different time zones
    "endTime"     : 3,  // num from 0-23
};

var groupTemplate = {
  "groupname"   : "mmonsteeeers",
  "password"    : "hdyldhgj883",  // stores hash
  "name"        : "Colin",
  "email"       : "colin@me.com",
  "summary"     : "Play or be played",
  // "startTime"   : 16, // num from 0-23, account for different time zones
  // "endTime"     : 2,  // num from 0-23
};

var charProfileTemplate = {
  gameName: "FFXIV",
  gameOptions: {
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
  },
  mic     : true,
  server  : "Tonberry",
};

var groupProfileTemplate = {
  gameName: "FFXIV",
  minDps  : 70, // damage per second
  maxDps  : 100,
  main    : "Dark Knight",   //
  jobs    : {       // jobs needed?
    "Warrior": true,
    "Time Mage": false,
    "Red Mage": false,
    "Sage": true
  }, // store an array of jobs they can play
  cleared : {       // required levels cleared for a player???
    A1S: true,
    A2S: true,
    A3S: true,
    A4S: false,
  },  // store an object or array ? with {levelName : boolean}
  mic     : true,      // mic required
  server  : "Tonberry"
};
// most important queries:
  // time available to play
  // job
  // DPS ??? is dps by job?
  // all available to play for a given job???
