'use strict';

var rippleGatewayApp = angular.module('rippleGatewayApp', [
  'ngRoute'
])

rippleGatewayApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'AdminCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .otherwise({
        redirectTo: '/admin'
      });
  });

rippleGatewayApp.controller('HomeCtrl', function ($scope) {
});

rippleGatewayApp.controller('AdminCtrl', function ($scope) {
  $scope.currencies = [];
  $scope.hotWallet = {};
  $scope.coldWallet = {};
  $scope.domain = '';
  $scope.pendingWithdrawals = [];
});
