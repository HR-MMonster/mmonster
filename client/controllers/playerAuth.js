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



.factory('Auth', function ($http, $location, $window) {

  var signin = function () {
    //POST login data to be matched against databse login info
    //if success, send to homepage
    //else if fail, send back to login
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });    
  };

  var signup = function () {
    //POST data to be stored into database as new object
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    //end session
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };


})