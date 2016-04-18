app.controller('AuthTabController', function($window, $location) {
    var AuthTabCtrl = this;
    AuthTabCtrl.group = {};

    AuthTabCtrl.tab = 'user';

    AuthTabCtrl.isSet = function(tab) {
      return AuthTabCtrl.tab === tab;
    };

    AuthTabCtrl.setTab = function(newTab) {
      AuthTabCtrl.tab = newTab;
    };
  })
  .controller('GroupAuthController', function ($window, $location, AuthGroup) {

    var GroupAuthCtrl = this;
    GroupAuthCtrl.group = {};
    
    GroupAuthCtrl.signin = function () {
      AuthGroup.signin(GroupAuthCtrl.group)
        .then(function (resp) {
          $window.localStorage.setItem('com.app', resp);


          $window.localStorage.setItem('id', resp.data._id);
          $window.localStorage.setItem('type', 'group');


          $window.location.assign('/');

        })
        .catch(function (error) {
          console.error(error);
        });
    };

    GroupAuthCtrl.signup = function () {
      AuthGroup.signup(GroupAuthCtrl.group)
        .then(function (resp) {

          $window.localStorage.setItem('com.app', resp);
          $window.localStorage.setItem('id', resp.data._id);
          $window.localStorage.setItem('type', 'group');
          $window.location.assign('/');


        })
        .catch(function (error) {
          console.error(error);
        });
    };
  })


  .factory('AuthGroup', function ($http, $location, $window) {

    var signin = function (group) {
      //POST login data to be matched against databse login info
      //if success, send to homepage
      //else if fail, send back to login
      return $http({
        method: 'POST',
        url: '/signin/group',
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

  })

  .controller('PlayerAuthController', function ($window, $location, AuthPlayer) {
    var PlayerAuthCtrl = this;
    PlayerAuthCtrl.player = {};



    PlayerAuthCtrl.signin = function () {
      AuthPlayer.signin(PlayerAuthCtrl.player)
        .then(function (resp) {
          $window.localStorage.setItem('com.app', resp);
          $window.localStorage.setItem('id', resp.data._id);
          $window.localStorage.setItem('type', 'user');
          $window.location.assign('/');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    PlayerAuthCtrl.signup = function () {
      AuthPlayer.signup(PlayerAuthCtrl.player)
        .then(function (resp) {
          $window.localStorage.setItem('com.app', resp);
          $window.localStorage.setItem('id', resp.data._id);
          $window.localStorage.setItem('type', 'user');
          $window.location.assign('/');

          // $location.path('/index.html');
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  })


  .factory('AuthPlayer', function ($http, $location, $window) {

    var signin = function (user) {
      //POST login data to be matched against databse login info
      //if success, send to homepage
      //else if fail, send back to login
      return $http({
        method: 'POST',
        url: '/signin/user',
        data: user
      })
        .then(function (resp) {
          return resp;
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