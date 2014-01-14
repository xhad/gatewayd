'use strict';

angular.module('publicApp')
  .controller('GatewayAccountsCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {}

    $http.get("http://localhost:4000/api/v1/sessions").success(function(session){
      console.log(session)
      alert(session)
    })

  }]);
