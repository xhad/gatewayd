'use strict';

angular.module('publicApp')
  .controller('GatewayNewUserCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
		$scope.user = null;

    $scope.registerUser = function () {
      if ($scope.user.password == $scope.user.password_confirmation) {
				delete $scope.user.password_confirmation;
		    $http.post('/api/v1/gateway/users', $scope.user)
				.success(function(user){
					updateUsers();
				})
				.error(console.log);
			}
		}
  }]);
