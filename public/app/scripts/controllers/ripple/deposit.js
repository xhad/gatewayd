'use strict'

angular.module('publicApp')
  .controller('RippleDepositsCtrl', ['$scope', '$http','$location', 'UserService', function ($scope, $http, $location, $user) {
    console.log('in the gateway accounts controller')
    console.log($user)
    if ($user.isLogged) {
      console.log("show the account page for "+$user.username)
    } else {
      $location.path('/login') 
    }
  }])
