angular.module('app.PlayerProfile', ['ngFileUpload'])
.factory('Profile', function($http, $location, $window, Upload) {
  var urlID = $location.absUrl().split('#');
  if (urlID.length > 1) {
    urlID = urlID[1].slice(1);
  } else {
    urlID = $window.localStorage.getItem('id');
  }

  console.log(urlID);

  var get = function() {
    return $http({
      method: 'GET',
      url: '/profile/users/' + urlID
    }).then(function(resp) {
      return resp.data;
    });
  };

  var update = function(profile) {
    $http({
      method: 'PUT',
      url: '/profile/users/570befca1b03fb3104ca1ec3',
      data: profile
    });
    console.log('running update');
  };

  var updatePhoto = function(photo) {
    Upload.upload({
      url: '/profile/users/' + urlID + '/photos',
      data: {userPhoto: photo}
    }).then(function (resp) {
      console.log('Success');
      console.log(resp);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    });
  };

  return {
    get: get,
    update: update,
    updatePhoto: updatePhoto
  };
})
.controller('ProfileController', ['Profile', function(Profile) {
  var ProfileCtrl = this;
  ProfileCtrl.profile = {};

  // Profile.get().then(function(profile) {
  //   ProfileCtrl.profile = profile;
  // });

  ProfileCtrl.upload = Profile.updatePhoto;

  Profile.get().then(function(profile) {
    console.log(profile);
    ProfileCtrl.profile = profile;
  });

  ProfileCtrl.update = function() {
    Profile.update(ProfileCtrl.profile);
  };
}])
.directive('ffxivEdit', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/ffxiv_edit.html',
    controller: 'FFXIVController',
    controllerAs: 'FFXIVCtrl'
  };
})
.directive('ffxivPublic', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/ffxiv_public.html',
    controller: 'FFXIVController',
    controllerAs: 'FFXIVCtrl'
  };
})
.controller('FFXIVController', function() {
  var FFXIVCtrl = this;
  FFXIVCtrl.profile = {};

  FFXIVCtrl.servers = ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Ramuh', 'Tonberry', 'Typhon', 'Unicorn', 'Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima', 'Valefor', 'Yojimbo', 'Zeromus', 'Anima', 'Asura', 'Belias', 'Chocobo', 'Hades', 'Ixion', 'Mandragora', 'Masamune', 'Pandaemonium', 'Shinryu', 'Titan', 'Adamantoise', 'Balmung', 'Cactuar', 'Coeurl', 'Faerie', 'Gilgamesh', 'Goblin', 'Jenova', 'Mateus', 'Midgardsormr', 'Sargatanas', 'Siren', 'Zalera', 'Behemoth', 'Brynhildr', 'Diabolos', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Malboro', 'Ultros', 'Cerberus', 'Lich', 'Moogle', 'Odin', 'Phoenix', 'Ragnarok', 'Shiva', 'Zodiark'];
  FFXIVCtrl.jobs = ['Paladin', 'Warrior', 'Dark Knight', 'White Mage', 'Scholar', 'Astrologian', 'Monk', 'Dragoon', 'Ninja', 'Black Mage', 'Summoner', 'Bard', 'Machinist'];

  FFXIVCtrl.fights = [
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
  },
  ];

  FFXIVCtrl.test = function() {
    console.log(FFXIVCtrl.profileImage);
  };

  FFXIVCtrl.update = function() {
    console.log('sending PUT request for ffxiv profile');
  };
});
