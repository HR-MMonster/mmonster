app.controller('ffxivSearchChar', function ($window, $location, $http) {

  var ffxivSearchCtrl = this;

  ffxivSearchCtrl.profile = {
    startTime: 0,
    endTime: 23
  };

  var collapseButton;
  $(document).ready(function() {
    collapseButton = $('#collapse-button');
    setTimeout(function() {
      collapseButton.click();
    }, 500);
  });

  ffxivSearchCtrl.search = function() {
    var query = ffxivSearchCtrl.profile;
    //This function prevents accidental falses from being passed in as queries
    for(var prop in query) {
      if(query[prop] === false || query[prop] === '') {
        query[prop] = undefined;
      }
    }

    console.log('QUERY BEING PASSED TO SERVER: ', query);

    return $http({
      method: 'GET',
      url: '../profile/characterProfiles',
      params: query
    })
    .then(function(users) {
      ffxivSearchCtrl.users = users;
      collapseButton.click();
    })
    .catch(function (error) {
      console.log('inside catch')
      console.error(error);
    });
  };


  ffxivSearchCtrl.slider = {
    floor: 0,
    ceil: 23
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
});
