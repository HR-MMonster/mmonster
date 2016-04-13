var randomUsernames = [
  'CouchChiller',
  'Sharpcharm',
  'Snarelure',
  'Skullbone',
  'Burnblaze',
  'Emberburn',
  'Emberfire',
  'Evilember',
  'Firespawn',
  'Flameblow'
  ];

var randomUserPasswords = [
  'dlkfadhf376e8237',
  '7hgfey37dy6738ee',
  '729183t59y373878',
  'jgfda92837874829',
  '721398193yr18797',
  '82918979t89d8786',
  '8987497t0dhkaljg',
  '9yduhfkjdahfkah8',
  '78e7jhiugidufr7k',
  '839eq86868q764r8'
];

var randomGroupNames = [
  'SniperGod',
  'TalkBomber',
  'SniperWish',
  'RavySnake',
  'WebTool',
  'TurtleCat',
  'BlogWobbles',
  'LuckyDusty',
  'RumChicken',
  'StonedTime'
];

var randomGroupPasswords = [
  'dlkfadjdghfiu237',
  '98938y37dy6738ee',
  '983497359y373878',
  'j87459747t874829',
  '7989r0707tt18797',
  '898r098r08qr8986',
  '88197487787dkljg',
  '9y38987e9duhfkj8',
  '79172987eidufr7k',
  '8947r970f8q764r8'
];

var ffxivJobs = [
  'Paladin',
  'Warrior',
  'DarkKnight',
  'WhiteMage',
  'Scholar',
  'Astrologian',
  'Monk',
  'Dragoon',
  'Ninja',
  'BlackMage',
  'Summoner',
  'Bard',
  'Machinist'
];

var ffxivAbr = [
  'T1',
  'T2',
  'T3',
  'T4',
  'T5',
  'T6',
  'T7',
  'T8',
  'T9',
  'T10',
  'T11',
  'T12',
  'T13',
  'A1S',
  'A2S',
  'A3S',
  'A4S',
  'A5S',
  'A6S',
  'A7S',
  'A8S'
];

var summaries = [
  "I like dogs and long walks on the beach",
  "Can't touch this",
  "I like one thing in life, and that's machining on FFR",
  "Piss me off or get hellfire",
  "Play or be played",
  "Are you a sadist, or a masochist",
  "Only devil's where prada",
  "My pops always said 'Watch your back', but its hard to look ahead",
  "I didn't know my daddy, so will you be him?",
  "My longest playing streak is 4 days straight, no food, no water!"
];

var names = [
  'Emma',
  'Noah',
  'Olivia',
  'Liam',
  'Sophia',
  'Mason',
  'Isabella',
  'Jacob',
  'Ava',
  'William',
  'Mia',
  'Ethan',
  'Emily',
  'Michael',
  'Abigail',
  'Alexander',
  'Madison',
  'James',
  'Charlotte',
  'Daniel'
];

var servers = ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Ramuh', 'Tonberry', 'Typhon', 'Unicorn', 'Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima', 'Valefor', 'Yojimbo', 'Zeromus', 'Anima', 'Asura', 'Belias', 'Chocobo', 'Hades', 'Ixion', 'Mandragora', 'Masamune', 'Pandaemonium', 'Shinryu', 'Titan', 'Adamantoise', 'Balmung', 'Cactuar', 'Coeurl', 'Faerie', 'Gilgamesh', 'Goblin', 'Jenova', 'Mateus', 'Midgardsormr', 'Sargatanas', 'Siren', 'Zalera', 'Behemoth', 'Brynhildr', 'Diabolos', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Malboro', 'Ultros', 'Cerberus', 'Lich', 'Moogle', 'Odin', 'Phoenix', 'Ragnarok', 'Shiva', 'Zodiark'];
var boolean = [true, false];

function randomIndex(len) {
  return Math.floor(Math.random() * len) % len;
}
// console.log(randomIndex(names.length));

function generateCharProfiles(len, gameName) {
  var charProfiles = [];
  var profile = Object.create(null);
  while (len > 0) {
    profile.gameName = gameName;
    profile.mic = boolean[randomIndex(boolean.length)];
    profile.server = servers[randomIndex(servers.length)];
    profile.dps = Math.floor(Math.random() * 100);
    profile.summary = summaries[randomIndex(summaries.length)];
    profile.main = ffxivJobs[randomIndex(ffxivJobs.length)];
    ffxivJobs.forEach(function(job) {
      profile[job] = boolean[randomIndex(boolean.length)];
    });
    ffxivAbr.forEach(function(abr) {
      profile[abr] = boolean[randomIndex(boolean.length)];
    });
    charProfiles.push(profile);
    profile = Object.create(null);
    len--;
}
  return charProfiles;
}

function generateUsers(len) {
  var users = [];
  var user = Object.create(null);
  while (len > 0) {
    user.username = randomUsernames[randomIndex(randomUsernames.length)];
    user.password = randomUserPasswords[randomIndex(randomUserPasswords.length)];
    user.name = names[randomIndex(names.length)];
    user.email = user.name.toLowerCase() + '@gmail.com';
    users.push(user);
    user = Object.create(null);
    len--;
  }
  return users;
}

// console.log(generateCharProfiles(2, 'FFXIV'));
// console.log(generateUsers(2));


function generateGroupProfiles(len, gameName) {
  var groupProfiles = [];
  var profile = Object.create(null);
  while (len > 0) {
    profile.gameName = gameName;
    profile.mic = boolean[randomIndex(boolean.length)];
    profile.server = servers[randomIndex(servers.length)];
    profile.summary = summaries[randomIndex(summaries.length)];
    groupProfiles.push(profile);
    profile = Object.create(null);
    len--;
}
  return groupProfiles;
}

function generateGroups(len) {
  var groups = [];
  var group = Object.create(null);
  while (len > 0) {
    group.groupname = randomGroupNames[randomIndex(randomGroupNames.length)];
    group.password = randomGroupPasswords[randomIndex(randomGroupPasswords.length)];
    group.name = names[randomIndex(names.length)];
    group.email = group.name.toLowerCase() + '@me.com';
    groups.push(group);
    group = Object.create(null);
    len--;
  }
  return groups;
}

module.exports = {
  generateUsers: generateUsers,
  generateCharProfiles: generateCharProfiles,
  generateGroups: generateGroups,
  generateGroupProfiles: generateGroupProfiles
};
// console.log(generateGroupProfiles(2, 'FFXIV'));
// console.log(generateGroups(2));


