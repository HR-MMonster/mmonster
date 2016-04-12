exports.users = users = [
  {
    "_id": "570c79619b9fec00444e616b",
    "salt": "$2a$10$Itr6Y/t5k8ZGqKVSFo4Qou",
    "username": "grandMage",
    "password": "$2a$10$Itr6Y/t5k8ZGqKVSFo4QounP4CiOf4jLq14zQQxlTFGJYF4culbBW",
    "name": "Travis",
    "email": "travis@me.com",
    "summary": "I like dogs and long walks on the beach",
    "startTime": 18,
    "endTime": 23,
    "__v": 0
  },
  {
    "_id": "570c79619b9fec00444e616d",
    "salt": "$2a$10$yVQo6uBJqU8h07s1xEfbdO",
    "username": "summonho",
    "password": "$2a$10$yVQo6uBJqU8h07s1xEfbdOZ09jbf5szqMk6kj349Kn4oH6ZV8JY3G",
    "name": "Elia",
    "email": "kd@me.com",
    "summary": "Can't touch this",
    "startTime": 19,
    "endTime": 24,
    "__v": 0
  },
  {
    "_id": "570c79619b9fec00444e616c",
    "salt": "$2a$10$PwazdvTlfdE0XFvi4fx9Hu",
    "username": "lamachina",
    "password": "$2a$10$PwazdvTlfdE0XFvi4fx9HuuYdxdTg4BXSF03bcWw/CpR2rC4AAAm2",
    "name": "Colin",
    "email": "colin@gmail.com",
    "summary": "I like one thing in life, and that's machining on FFR",
    "startTime": 22,
    "endTime": 3,
    "__v": 0
  },
  {
    "_id": "570c79619b9fec00444e616e",
    "salt": "$2a$10$hkuITkmDg8bQtwvOB2wQi.",
    "username": "god",
    "password": "$2a$10$hkuITkmDg8bQtwvOB2wQi.wUNuAKglxks7HVzKxDq2eE5dq3PRQdi",
    "name": "dont say it in vain",
    "email": "alpha@omega.com",
    "summary": "Piss me off or get hellfire",
    "startTime": 13,
    "endTime": 23,
    "__v": 0
  }
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

exports.characterProfiles = characterProfiles = [
  {
    gameName: "FFXIV",
    mic     : true,
    server  : "Tonberry",
    dps: 35,
    main: "dragoon",
    paladin: true,
    warrior: false,
    darkKnight: true,
    whiteMage: true,
    scholar: false,
    astrologian: true,
    monk: true,
    dragoon: false,
    ninja: true,
    blackMage: true,
    summoner: true,
    bard: true,
    machinist: false,
    T1: true,
    T2: true,
    T3: true,
    T4: true,
    T5: true,
    T6: true,
    T7: false,
    T8: false,
    T9: false,
    T10: false,
    T11: false,
    T12: false,
    T13: false,
    A1S: false,
    A2S: false,
    A3S: false,
    A4S: false,
    A5S: false,
    A6S: false,
    A7S: false,
    A8S: false,
    user: users[0]
  },
  {
    gameName: "FFXIV",
    mic     : true,
    server  : "Typhon",
    dps: 45,
    main: "ninja",
    paladin: true,
    warrior: false,
    darkKnight: true,
    whiteMage: true,
    scholar: true,
    astrologian: true,
    monk: true,
    dragoon: false,
    ninja: true,
    blackMage: true,
    summoner: true,
    bard: false,
    machinist: true,
    T1: true,
    T2: true,
    T3: true,
    T4: true,
    T5: true,
    T6: true,
    T7: true,
    T8: true,
    T9: true,
    T10: true,
    T11: true,
    T12: true,
    T13: false,
    A1S: false,
    A2S: false,
    A3S: false,
    A4S: false,
    A5S: false,
    A6S: false,
    A7S: false,
    A8S: false,
    user: users[1]
  },
  {
    gameName: "FFXIV",
    mic     : false,
    server  : "Atomos",
    dps: 78,
    main: "summoner",
    paladin: true,
    warrior: false,
    darkKnight: false,
    whiteMage: false,
    scholar: true,
    astrologian: true,
    monk: true,
    dragoon: false,
    ninja: true,
    blackMage: true,
    summoner: true,
    bard: false,
    machinist: false,
    T1: true,
    T2: true,
    T3: true,
    T4: true,
    T5: true,
    T6: true,
    T7: true,
    T8: true,
    T9: true,
    T10: true,
    T11: true,
    T12: true,
    T13: true,
    A1S: true,
    A2S: true,
    A3S: true,
    A4S: false,
    A5S: false,
    A6S: false,
    A7S: false,
    A8S: false,
    user: users[2]
  },
  {
    gameName: "FFXIV",
    mic     : true,
    server  : "Carbuncle",
    dps: 56,
    main: "whiteMage",
    paladin: true,
    warrior: false,
    darkKnight: true,
    whiteMage: true,
    scholar: false,
    astrologian: true,
    monk: false,
    dragoon: true,
    ninja: true,
    blackMage: true,
    summoner: true,
    bard: false,
    machinist: false,
    T1: true,
    T2: true,
    T3: true,
    T4: true,
    T5: true,
    T6: true,
    T7: true,
    T8: true,
    T9: true,
    T10: true,
    T11: true,
    T12: true,
    T13: false,
    A1S: false,
    A2S: false,
    A3S: false,
    A4S: false,
    A5S: false,
    A6S: false,
    A7S: false,
    A8S: false,
    user: users[3]
  },
  // {
  //   gameName: "FFXIV",
  //   mic     : true,
  //   server  : "Garuda",
  //   dps: 45,
  //   main: "warrior",
  //   paladin: true,
  //   warrior: false,
  //   darkKnight: true,
  //   whiteMage: true,
  //   scholar: true,
  //   astrologian: true,
  //   monk: true,
  //   dragoon: false,
  //   ninja: true,
  //   blackMage: true,
  //   summoner: true,
  //   bard: false,
  //   machinist: true,
  //   T1: true,
  //   T2: true,
  //   T3: true,
  //   T4: true,
  //   T5: true,
  //   T6: true,
  //   T7: true,
  //   T8: true,
  //   T9: true,
  //   T10: true,
  //   T11: true,
  //   T12: true,
  //   T13: false,
  //   A1S: false,
  //   A2S: false,
  //   A3S: false,
  //   A4S: false,
  //   A5S: false,
  //   A6S: false,
  //   A7S: false,
  //   A8S: false,
  //   user: "570c0fb98c3322591ce56e29"
  // }
];



//   {
//     gameName: "FFXIV",
//     dps     : 66, // damage per second
//     main    : "Red Mage",   //
//     jobs    : {
//       "Warrior": false,
//       "Time Mage": true,
//       "Red Mage": false,
//       "Sage": true,
//       "Mystic Knight": true
//     }, // store an array of jobs they can play
//     cleared : {
//       A1S: true,
//       A2S: true,
//       A3S: true,
//       A4S: false,
//     },  // store an object or array ? with {levelName : boolean}
//     mic     : false,
//     server  : "HappySappy"
//   },
//   {
//     gameName: "FFXIV",
//     dps     : 78, // damage per second
//     main    : "Dancer",   //
//     jobs    : {
//       "Warrior": true,
//       "Time Mage": false,
//       "Red Mage": false,
//       "Sage": true
//     }, // store an array of jobs they can play
//     cleared : {
//       A1S: true,
//       A2S: true,
//       A3S: true,
//       A4S: true,
//     },  // store an object or array ? with {levelName : boolean}
//     mic     : true,
//     server  : "Deuce"
//   },
//   {
//     gameName: "FFXIV",
//     dps     : 45, // damage per second
//     main    : "Summoner",   //
//     jobs    : {
//       "Warrior": true,
//       "Time Mage": false,
//       "Red Mage": false,
//       "Sage": true
//     }, // store an array of jobs they can play
//     cleared : {
//       A1S: true,
//       A2S: true,
//       A3S: false,
//       A4S: false,
//     },  // store an object or array ? with {levelName : boolean}
//     mic     : false,
//     server  : "Roxbury"
//   },
// ];


// most important queries:
  // time available to play
  // job
  // DPS ??? is dps by job?
  // all available to play for a given job???
