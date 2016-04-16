app.controller('NavController', function($window, $http) {
  var NavCtrl = this;

  var id = $window.localStorage.getItem('id');

  NavCtrl.isLoggedIn = id ? true : false;

  NavCtrl.logOut = function() {
    $http({
      method: 'GET',
      url: '/logout'
    }).then(function() {
      $window.localStorage.setItem('id', '');
      NavCtrl.isLoggedIn = false;
      $window.location.assign('/');
    });
  };
})
.directive('navbar', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/navbar.html',
    controller: 'NavController',
    controllerAs: 'NavCtrl',
    replace: true
  };
});
