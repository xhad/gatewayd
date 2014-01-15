'use strict'

angular.module('publicApp')
  .controller('GatewayDepositCtrl', ['$scope', '$http','$location', 'UserService', function ($scope, $http, $location, $user) {
    if (!$user.isLogged) {
      $location.path('/login') 
    }
  }])
