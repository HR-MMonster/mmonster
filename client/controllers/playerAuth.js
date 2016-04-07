angular.module('app.auth', [])

.controller('PlayerAuthController', function ($window, $location, Auth) {
  var PlayerAuthCtrl = this;
  PlayerAuthCtrl.player = {};



  PlayerAuthCtrl.signin = function () {
    Auth.signin(PlayerAuthCtrl.player)
      .then(function (token) {
        $window.localStorage.setItem('com.app', token);
        $location.path('./index.html');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  PlayerAuthCtrl.signup = function () {
    Auth.signup(PlayerAuthCtrl.player)
      .then(function (token) {
        $window.localStorage.setItem('com.app', token);
        $location.path('./index.html');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});