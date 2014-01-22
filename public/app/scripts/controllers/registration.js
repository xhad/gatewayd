'use strict';

angular.module('publicApp')
  .controller('RegistrationCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
		$scope.user = null;

    $scope.registerUser = function () {
      console.log('about to register user');
      console.log('passwords are the same.');
      $http.post('/api/v1/gateway/users', $scope.user)
      .success(function(user){
        //updateUsers();
      })
      .error(function(err) {

      });
    }
  }]);
