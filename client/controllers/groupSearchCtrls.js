// angular.module('app.groupSearch', ['rzModule'])

app.controller('ffxivSearchGroup', function ($window, $location, $http) {
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
    //sanitize the falses -> loop through the user object and set any falses to undefined
    console.log('QUERY 1: ', query);
    for(var prop in query) {
      if(query[prop] === false || query[prop] === '') {
        query[prop] = undefined;
      }
    }

    console.log('QUERY 2: ', query);
    // post request with query object as body
    return $http({
      method: 'GET',
      url: '../profile/groupProfiles',
      params: query
    })
    .then(function(groups) {
      console.log('inside then');
      console.log(groups.data);
      ffxivSearchCtrl.groups = groups;
      // console.log(ffxivSearchCtrl.groups);
      collapseButton.click();
    })
    .catch(function (error) {
      console.log('inside catch');
      console.error(error);
    });
      //angular get request with query
    // receive response and display directly to html
  };


  ffxivSearchCtrl.slider = {
    floor: 0,
    ceil: 23
  };


  ffxivSearchCtrl.servers = ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Ramuh', 'Tonberry', 'Typhon', 'Unicorn', 'Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima', 'Valefor', 'Yojimbo', 'Zeromus', 'Anima', 'Asura', 'Belias', 'Chocobo', 'Hades', 'Ixion', 'Mandragora', 'Masamune', 'Pandaemonium', 'Shinryu', 'Titan', 'Adamantoise', 'Balmung', 'Cactuar', 'Coeurl', 'Faerie', 'Gilgamesh', 'Goblin', 'Jenova', 'Mateus', 'Midgardsormr', 'Sargatanas', 'Siren', 'Zalera', 'Behemoth', 'Brynhildr', 'Diabolos', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Malboro', 'Ultros', 'Cerberus', 'Lich', 'Moogle', 'Odin', 'Phoenix', 'Ragnarok', 'Shiva', 'Zodiark'];
  ffxivSearchCtrl.jobs = [
  {name: 'Paladin', model: 'Paladin'},
  {name: 'Warrior', model: 'Warrior'},
  {name: 'Dark Knight', model: 'DarkKnight'},
  {name: 'White Mage', model: 'WhiteMage'},
  {name: 'Scholar', model: 'Scholar'},
  {name: 'Astrologian', model: 'Astrologian'},
  {name: 'Monk', model: 'Monk'},
  {name: 'Dragoon', model: 'Dragoon'},
  {name: 'Ninja', model: 'Ninja'},
  {name: 'Black Mage', model: 'BlackMage'},
  {name: 'Summoner', model: 'Summoner'},
  {name: 'Bard', model: 'Bard'},
  {name: 'Machinist', model: 'Machinist'}
  ];
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

.directive('ffxivSearchGroupTemp', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/ffxiv_group_search.html',
    controller: 'ffxivSearchGroup',
    controllerAs: 'ffxivSearchCtrl'
  };
});
