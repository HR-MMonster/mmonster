var users = [
  {
    "username"    : "grandMage",
    "password"    : "7gjk84njk",  // stores hash
    "name"        : "Travis",
    "email"       : "travis@me.com",
    "summary"     : "I like dogs and long walks on the beach",
    "startTime"   : 18, // num from 0-23, account for different time zones
    "endTime"     : 23,  // num from 0-23
  },
  {
    "username"    : "lamachina",
    "password"    : "kdhfihd787",  // stores hash
    "name"        : "Colin",
    "email"       : "colin@gmail.com",
    "summary"     : "I like one thing in life, and that's machining on FFR",
    "startTime"   : 22, // num from 0-23, account for different time zones
    "endTime"     : 3,  // num from 0-23
  },
  {
    "username"    : "summonho",
    "password"    : "fkladhfo7765e",  // stores hash
    "name"        : "Elia",
    "email"       : "kd@me.com",
    "summary"     : "Can't touch this",
    "startTime"   : 19, // num from 0-23, account for different time zones
    "endTime"     : 24,  // num from 0-23
  },
  {
    "username"    : "god",
    "password"    : "hewhohasnoname",  // stores hash
    "name"        : "dont say it in vain",
    "email"       : "alpha@omega.com",
    "summary"     : "Piss me off or get hellfire",
    "startTime"   : 13, // num from 0-23, account for different time zones
    "endTime"     : 23,  // num from 0-23
  },


];

var groups = [
  {
    "groupname"   : "mmonsteeeers",
    "password"    : "hdyldhgj883",  // stores hash
    "name"        : "Colin",
    "email"       : "colin@me.com",
    "summary"     : "Play or be played",
    "startTime"   : 16, // num from 0-23, account for different time zones
    "endTime"     : 2,  // num from 0-23
  },
];

exports.characterProfiles = [
  {
    gameName: "FFXIV",
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
      A2S: false,
      A3S: false,
      A4S: false,
    },  // store an object or array ? with {levelName : boolean}
    mic     : true,
    server  : "Tonberry"
  },
  {
    gameName: "FFXIV",
    dps     : 66, // damage per second
    main    : "Red Mage",   //
    jobs    : {
      "Warrior": false,
      "Time Mage": true,
      "Red Mage": false,
      "Sage": true,
      "Mystic Knight": true
    }, // store an array of jobs they can play
    cleared : {
      A1S: true,
      A2S: true,
      A3S: true,
      A4S: false,
    },  // store an object or array ? with {levelName : boolean}
    mic     : false,
    server  : "HappySappy"
  },
  {
    gameName: "FFXIV",
    dps     : 78, // damage per second
    main    : "Dancer",   //
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
      A4S: true,
    },  // store an object or array ? with {levelName : boolean}
    mic     : true,
    server  : "Deuce"
  },
  {
    gameName: "FFXIV",
    dps     : 45, // damage per second
    main    : "Summoner",   //
    jobs    : {
      "Warrior": true,
      "Time Mage": false,
      "Red Mage": false,
      "Sage": true
    }, // store an array of jobs they can play
    cleared : {
      A1S: true,
      A2S: true,
      A3S: false,
      A4S: false,
    },  // store an object or array ? with {levelName : boolean}
    mic     : false,
    server  : "Roxbury"
  },
];


// most important queries:
  // time available to play
  // job
  // DPS ??? is dps by job?
  // all available to play for a given job???
