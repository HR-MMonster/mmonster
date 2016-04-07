angular.module('app.auth', [])

.controller('GroupAuthController', function ($window, $location, Auth) {
  var GroupAuthCtrl = this;
  GroupAuthCtrl.group = {};

  GroupAuthCtrl.signin = function () {
    Auth.signin(GroupAuthCtrl.group)
      .then(function (token) {
        $window.localStorage.setItem('com.app', token);
        $location.path('./index.html');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  GroupAuthCtrl.signup = function () {
    Auth.signup(GroupAuthCtrl.group)
      .then(function (token) {
        $window.localStorage.setItem('com.app', token);
        $location.path('./index.html');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});