'use strict';

angular.module('publicApp')
  .controller('AdminSettingsCtrl', ['$scope', '$http', '$location', 'UserService', function ($scope, $http, $location, $user) {
    if (!$user.admin) {
      $location.path("/login")
      return
    }
    $scope.adminSettings = { 
      hotWalletAddress: 'hotWalletAddress',
      coldWalletAddress: 'coldWalletAddress',
      passwordResetEmail: $user.username
    }

    $scope.userService = $user
  }]);
