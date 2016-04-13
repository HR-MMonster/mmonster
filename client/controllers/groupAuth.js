angular.module('groupAuth', [])

.controller('GroupAuthController', function ($window, $location, Auth) {
  
  var GroupAuthCtrl = this;
  GroupAuthCtrl.group = {};



  GroupAuthCtrl.signin = function () {
    Auth.signin(GroupAuthCtrl.group)
      .then(function (resp) {
        $window.localStorage.setItem('com.app', resp);


        $window.localStorage.setItem('id', resp.data._id);

        $location.path('./index.html');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  GroupAuthCtrl.signup = function () {
    Auth.signup(GroupAuthCtrl.group)
      .then(function (resp) {
        $window.localStorage.setItem('com.app', resp);
        $location.path('./index.html');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});