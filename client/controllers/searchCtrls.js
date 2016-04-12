//Need to restructure query object to latest notation for user objects
//nested 


angular.module('app.characterSearch', [])

.controller('ffxivSearchChar', function ($window, $location, $http) {
  var ffxivSearchCtrl = this;
  ffxivSearchCtrl.profile = {};
  

  // ffxivSearchCtrl.test = function() {
  //   console.log(ffxivSearchCtrl.profile) 
  //   console.log('inside test');
  // };

  ffxivSearchCtrl.search = function() {
    //capture the user profile stats from a button click
    var query = ffxivSearchCtrl.profile;
    //reformat the object according to DB team's standard
    //sanitize the falses -> loop through the user object and set any falses to undefined
    console.log('QUERY 1: ', query);
    for(var prop in query) {
      if(query[prop] === false) {
        query[prop] = undefined;
      }
    };
    console.log('QUERY 2: ', query);
    // post request with query object as body
    return $http({
      method: 'GET',
      url: '../profile/characterProfiles',
      data: query
    })
    .then(function(users) {
      // console.log('inside then');
      // console.log(users);
      ffxivSearchCtrl.users = users;
      // console.log(ffxivSearchCtrl.users);
    })
    .catch(function (error) {
      console.log('inside catch')
      console.error(error);
    });
      //angular get request with query
    // receive response and display directly to html
  };



  ffxivSearchCtrl.servers = ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Ramuh', 'Tonberry', 'Typhon', 'Unicorn', 'Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima', 'Valefor', 'Yojimbo', 'Zeromus', 'Anima', 'Asura', 'Belias', 'Chocobo', 'Hades', 'Ixion', 'Mandragora', 'Masamune', 'Pandaemonium', 'Shinryu', 'Titan', 'Adamantoise', 'Balmung', 'Cactuar', 'Coeurl', 'Faerie', 'Gilgamesh', 'Goblin', 'Jenova', 'Mateus', 'Midgardsormr', 'Sargatanas', 'Siren', 'Zalera', 'Behemoth', 'Brynhildr', 'Diabolos', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Malboro', 'Ultros', 'Cerberus', 'Lich', 'Moogle', 'Odin', 'Phoenix', 'Ragnarok', 'Shiva', 'Zodiark'];
    ffxivSearchCtrl.jobs = ['Paladin', 'Warrior', 'Dark Knight', 'White Mage', 'Scholar', 'Astrologian', 'Monk', 'Dragoon', 'Ninja', 'Black Mage', 'Summoner', 'Bard', 'Machinist'];

    ffxivSearchCtrl.fights = [
      {
        name: 'The Binding Coil of Bahamut: Turn 1',
        abr: 'T1'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 2',
        abr: 'T2'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 3',
        abr: 'T3'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 4',
        abr: 'T4'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 5',
        abr: 'T5'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 6',
        abr: 'T6'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 7',
        abr: 'T7'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 8',
        abr: 'T8'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 9',
        abr: 'T9'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 10',
        abr: 'T10'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 11',
        abr: 'T11'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 12',
        abr: 'T12'
      },
      {
        name: 'The Binding Coil of Bahamut: Turn 13',
        abr: 'T13'
      },
      {
        name: 'Alexander Gordias: The Fist of the Father (Savage)',
        abr: 'A1S'
      },
      {
        name: 'Alexander Gordias: The Cuff of the Father (Savage)',
        abr: 'A2S'
      },
      {
        name: 'Alexander Gordias: The Arm of the Father (Savage)',
        abr: 'A3S'
      },
      {
        name: 'Alexander Gordias: The Burden of the Father (Savage)',
        abr: 'A4S'
      },
      {
        name: 'Alexander Midas: The Fist of the Son (Savage)',
        abr: 'A5S'
      },
      {
        name: 'Alexander Midas: The Cuff of the Son (Savage)',
        abr: 'A6S'
      },
      {
        name: 'Alexander Midas: The Arm of the Son (Savage)',
        abr: 'A7S'
      },
      {
        name: 'Alexander Midas: The Burden of the Son (Savage)',
        abr: 'A8S'
      }
    ];
})

.directive('ffxivSearchTemp', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/ffxiv_search.html',
    controller: 'ffxivSearchChar',
    controllerAs: 'ffxivSearchCtrl'
  };
})
