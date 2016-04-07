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
.controller('ProfileController', function($http, Profile) {
  var ProfileCtrl = this;
  ProfileCtrl.profile = {};

  // Profile.get().then(function(profile) {
  //   ProfileCtrl.profile = profile;
  // });

  ProfileCtrl.profile = Profile.get();

  ProfileCtrl.update = function() {
    Profile.update(ProfileCtrl.profile);
  };
})
.directive('ffxiv', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/ffxiv_profile.html',
    controller: 'FFXIVController'
  };
})
.controller('FFXIVController', function() {

});
