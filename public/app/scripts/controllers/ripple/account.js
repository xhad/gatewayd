'use strict'

angular.module('publicApp')
  .controller('RippleAccountsCtrl', ['$scope', '$http','$location', 'UserService', function ($scope, $http, $location, $user) {
    if (!$user.isLogged) {
      $location.path('/login') 
    }
  }])
