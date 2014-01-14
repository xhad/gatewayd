'use strict';

angular.module('publicApp')
  .controller('GatewayAccountsCtrl', ['$scope', '$http','$location', function ($scope, $http, $location) {
    $scope.user = {}

    $http.get("http://localhost:4000/api/v1/sessions").success(function(session){
      if (!!!session.accountId) {
        $location.path('/login') 
      }
    })

  }]);
