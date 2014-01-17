'use strict';

angular.module('publicApp')
  .controller('AdminGatewayUsersCtrl', ['Base64', 'UserService', '$scope', '$http', '$location', function (Base64, $user, $scope, $http, $location) {
    if (!$user.admin) { $location.path('/login') }
		$scope.user = {}
		$scope.users = []

		function updateUsers() {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($user.username+':'+$user.password)
			$http.get('/api/v1/gateway/users').success(function(resp){
      $scope.loadingUsers = false
				$scope.users = resp.gatewayUsers;
			});
		}

    $scope.registerUser = function () {
      console.log('register user called');
      if ($scope.user.password == $scope.user.password_confirmation) {
				delete $scope.user.password_confirmation;
        $scope.user.username = $scope.user.name;
		    $http.post('/api/v1/gateway/users', $scope.user).success(function(user){
					updateUsers()
				})
				.error(console.log)
			}
		}

    $scope.loadingUsers = true
		updateUsers();
  }]);
