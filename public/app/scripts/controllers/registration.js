'use strict';

angular.module('publicApp')
  .controller('RegistrationCtrl', ['$scope', '$http', '$location','UserService', function ($scope, $http, $location, $user) {
		$scope.user = null;

    $scope.registerUser = function () {
      console.log('about to register user');
      console.log('passwords are the same.');
      $http.post('/api/v1/users', $scope.user)
      .success(function(user){
        $user.login($scope.user.name, $scope.user.password);
      })
      .error(function(err) {

      });
    }
  }]);
