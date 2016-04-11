angular.module('app.auth', [])

.controller('PlayerAuthController', function ($window, $location, Auth) {
  console.log('can you see this?');
  var PlayerAuthCtrl = this;
  PlayerAuthCtrl.player = {};



  PlayerAuthCtrl.signin = function () {
    Auth.signin(PlayerAuthCtrl.player)
      .then(function (token) {
        console.log('inside signin')
        $window.localStorage.setItem('com.app', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  PlayerAuthCtrl.signup = function () {
    Auth.signup(PlayerAuthCtrl.player)
      .then(function (token) {
        console.log('logging line 24');
        $window.localStorage.setItem('com.app', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
})


.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    //POST login data to be matched against databse login info
    //if success, send to homepage
    //else if fail, send back to login
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    //POST data to be stored into database as new object
    return $http({
      method: 'POST',
      url: '/signup/user',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.app');
  };

  var signout = function () {
    //end session
    $window.localStorage.removeItem('com.app');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };

});