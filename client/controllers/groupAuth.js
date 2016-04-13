angular.module('groupAuth', [])

.controller('GroupAuthController', function ($window, $location, Auth) {
  
  var GroupAuthCtrl = this;
  GroupAuthCtrl.group = {};



  GroupAuthCtrl.signin = function () {
    Auth.signin(GroupAuthCtrl.group)
      .then(function (resp) {
        $window.localStorage.setItem('com.app', resp);


        $window.localStorage.setItem('id', resp.data._id);

        $window.location.assign('/');

      })
      .catch(function (error) {
        console.error(error);
      });
  };

  GroupAuthCtrl.signup = function () {
    Auth.signup(GroupAuthCtrl.group)
      .then(function (resp) {

        $window.localStorage.setItem('com.app', resp);
        $window.localStorage.setItem('id', resp.data._id);
        $window.location.assign('/');


      })
      .catch(function (error) {
        console.error(error);
      });
  };
});


.factory('Auth', function ($http, $location, $window) {

  var signin = function (group) {
    //POST login data to be matched against databse login info
    //if success, send to homepage
    //else if fail, send back to login
    return $http({
      method: 'POST',
      url: '/signin',
      data: group
    })
    .then(function (resp) {
      return resp;
    });
  };

  var signup = function (group) {
    //POST data to be stored into database as new object
    return $http({
      method: 'POST',
      url: '/signup/group',
      data: group
    })
    .then(function (resp) {
      return resp;
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