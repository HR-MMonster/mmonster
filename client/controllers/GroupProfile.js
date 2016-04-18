app.factory('GroupProfile', function($http, $location, $window, Upload) {
  var groupID = $location.absUrl().split('#');
  if (groupID.length > 1) {
    groupID = groupID[1].slice(1);
  } else {
    groupID = $window.localStorage.getItem('id');
  }

  var groupGameID;

  var get = function() {
    return $http({
      method: 'GET',
      url: '/profile/groups/' + groupID
    }).then(function(resp) {
      return resp.data;
    });
  };

  var update = function(profile) {
    $http({
      method: 'PUT',
      url: '/profile/groups/' + groupID,
      data: profile
    });
    console.log('running update');
  };

  var getFFXIV = function() {
    return $http({
      method: 'GET',
      url: '/profile/groups/' + groupID + '/groupProfiles'
    }).then(function(resp) {
      var FFXIVProfile = resp.data[0];
      groupGameID = FFXIVProfile._id;
      return FFXIVProfile;
    });
  };

  var updateFFXIV = function(profile) {
    $http({
      method: 'PUT',
      url: '/profile/groups/' + groupID + '/groupProfiles/' + groupGameID,
      data: profile
    }).then(function(resp) {
      console.log(resp.data);
    }, function(resp) {
      console.log('err status code: ' + resp.statusCode);
    });
  };

  var updatePhoto = function(photo) {
    return Upload.upload({
      url: '/profile/groups/' + groupID + '/photos',
      data: {groupPhoto: photo}
    }).then(function (resp) {
      return resp.data.photo;
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    });
  };

  var postMessage = function(message) {
    var posterID = $window.localStorage.getItem('id');
    var posterType = $window.localStorage.getItem('type');
    if (posterID) {
      return $http({
        method: 'POST',
        url: '/profile/groupProfiles/' + groupGameID + '/messages',
        data: {
          message: {
            type: posterType,
            typeId: posterID,
            content: message
          }
        }
      });
    }
  };

  var getMessageAssets = function(message) {
    var url;
    var extension = message.type === 'user' ? 'users' : 'groups';
    $http({
      method: 'GET',
      url: '/profile/' + extension + '/' + message.typeId
    }).then(function(resp) {
      var posterProfile = resp.data;
      message.photo = posterProfile.photo;
      message.name = message.type === 'user' ? posterProfile.username : posterProfile.groupname;
    });
  };

  return {
    get: get,
    update: update,
    updatePhoto: updatePhoto,
    getFFXIV: getFFXIV,
    updateFFXIV: updateFFXIV,
    postMessage: postMessage,
    getMessageAssets: getMessageAssets
  };
})
.controller('GroupProfileController', ['GroupProfile', function(GroupProfile) {
  var ProfileCtrl = this;
  ProfileCtrl.profile = {};

  ProfileCtrl.slider = {
    floor: 0,
    ceil: 23
  };

  ProfileCtrl.upload = function(file) {
    GroupProfile.updatePhoto(file).then(function(img) {
      if (img) ProfileCtrl.profile.photo = img;
    });
  };

  GroupProfile.get().then(function(profile) {
    ProfileCtrl.profile = profile;
  });

  ProfileCtrl.update = function() {
    GroupProfile.update(ProfileCtrl.profile);
  };
}])
.directive('ffxivGroupEdit', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/ffxiv_group_edit.html',
    controller: 'FFXIVGroupController',
    controllerAs: 'FFXIVGroupCtrl'
  };
})
.directive('ffxivGroupPublic', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/ffxiv_group_public.html',
    controller: 'FFXIVGroupController',
    controllerAs: 'FFXIVGroupCtrl'
  };
})
.controller('FFXIVGroupController', function(GroupProfile) {
  var FFXIVGroupCtrl = this;

  $(document).ready(function() {
    $('body').on('click', '.profile-redirect', function() {
      window.location.reload();
    });
  });

  FFXIVGroupCtrl.getProfile = function() {
    FFXIVGroupCtrl.profile = GroupProfile.getFFXIV().then(function(profile) {
      FFXIVGroupCtrl.profile = profile;
      FFXIVGroupCtrl.profile.messages.forEach(GroupProfile.getMessageAssets);
    });
  };

  FFXIVGroupCtrl.getProfile();


  FFXIVGroupCtrl.postMessage = function() {
    GroupProfile.postMessage(FFXIVGroupCtrl.newMessage)
    .then(FFXIVGroupCtrl.getProfile);
  };

  FFXIVGroupCtrl.servers = ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Ramuh', 'Tonberry', 'Typhon', 'Unicorn', 'Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima', 'Valefor', 'Yojimbo', 'Zeromus', 'Anima', 'Asura', 'Belias', 'Chocobo', 'Hades', 'Ixion', 'Mandragora', 'Masamune', 'Pandaemonium', 'Shinryu', 'Titan', 'Adamantoise', 'Balmung', 'Cactuar', 'Coeurl', 'Faerie', 'Gilgamesh', 'Goblin', 'Jenova', 'Mateus', 'Midgardsormr', 'Sargatanas', 'Siren', 'Zalera', 'Behemoth', 'Brynhildr', 'Diabolos', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Malboro', 'Ultros', 'Cerberus', 'Lich', 'Moogle', 'Odin', 'Phoenix', 'Ragnarok', 'Shiva', 'Zodiark'];

  FFXIVGroupCtrl.jobs = [
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

  FFXIVGroupCtrl.fights = [
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

  FFXIVGroupCtrl.update = function() {
    GroupProfile.updateFFXIV(FFXIVGroupCtrl.profile);
  };
});
