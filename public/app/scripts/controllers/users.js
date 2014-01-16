'use strict';

angular.module('publicApp')
  .controller('AdminGatewayUsersCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
		$scope.user = null
		$scope.users = []

		function updateUsers() {
			$http.get('/api/v1/gateway/users').success(function(resp){
				$scope.users = resp.gatewayUsers;
			});
		}

    $scope.registerUser = function () {
      if ($scope.user.password == $scope.user.password_confirmation) {
				delete $scope.user.password_confirmation
		    $http.post('/api/v1/gateway/users', $scope.user)
				.success(function(user){
					updateUsers()
				})
				.error(console.log)
			}
		}

    $scope.loadingUsers = true
		updateUsers();
  }]);
