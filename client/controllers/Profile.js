angular.module('app.PlayerProfile', [])
.factory('Profile', function() {
  var get = function() {
    // return $http({
    //   method: 'GET',
    //   url: '/profile'
    // }).then(function(resp) {
    //   return resp.data;
    // });

    return {
      realname: 'Travis',
      location: 'Japan',
      activeGame: 'FFXIV',
      profileImage: 'http://i.imgur.com/B43Ysgq.png?1',
      games: {
        'ffxiv': true
      }
    };
  };

  var update = function(profile) {
    // $http({
    //   method: 'PUT',
    //   url: '/profile',
    //   data: profile
    // });
    console.log('running update');
  };

  return {
    get: get,
    update: update
  };
})
.controller('ProfileController', ['Profile', function(Profile) {
  var ProfileCtrl = this;
  ProfileCtrl.profile = {};

  // Profile.get().then(function(profile) {
  //   ProfileCtrl.profile = profile;
  // });

  ProfileCtrl.profile = Profile.get();

  ProfileCtrl.update = function() {
    Profile.update(ProfileCtrl.profile);
  };
}])
.directive('ffxiv', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/ffxiv_profile.html',
    controller: 'FFXIVController',
    controllerAs: 'FFXIVCtrl'
  };
})
.controller('FFXIVController', function() {
  this.servers = ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Ramuh', 'Tonberry', 'Typhon', 'Unicorn', 'Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima', 'Valefor', 'Yojimbo', 'Zeromus', 'Anima', 'Asura', 'Belias', 'Chocobo', 'Hades', 'Ixion', 'Mandragora', 'Masamune', 'Pandaemonium', 'Shinryu', 'Titan', 'Adamantoise', 'Balmung', 'Cactuar', 'Coeurl', 'Faerie', 'Gilgamesh', 'Goblin', 'Jenova', 'Mateus', 'Midgardsormr', 'Sargatanas', 'Siren', 'Zalera', 'Behemoth', 'Brynhildr', 'Diabolos', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Malboro', 'Ultros', 'Cerberus', 'Lich', 'Moogle', 'Odin', 'Phoenix', 'Ragnarok', 'Shiva', 'Zodiark'];
});
