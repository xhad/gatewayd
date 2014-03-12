'use strict';

angular.module('publicApp')
  .controller('RegistrationCtrl', ['$scope', '$http', '$location','UserService', 'Base64', function ($scope, $http, $location, $user, Base64) {
		$scope.user = null;

    $scope.registerUser = function () {
      var username = $scope.user.name;
      var password = $scope.user.password;
      $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(username+':'+password);
      $http.post('/api/v1/users', $scope.user)
      .success(function(user){
        $user.login($scope.user.name, $scope.user.password);
      })
      .error(function(err) {

      });
    }
  }]);
