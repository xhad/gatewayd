'use strict';

angular.module('publicApp')
  .controller('LoginCtrl', ['$scope', '$http', '$location', 'UserService', function ($scope, $http, $location, $user) {
    $scope.user = {}
    $scope.userService = $user

    $scope.logout = function() {
      $user.logout()
    }

    $scope.login = function () {
			var name = $scope.user.name;
			var password = $scope.user.password;
      $user.login(name, password, function(err, session){
        if (!!session.username) {
					$location.path('/gateway/account');
				} else {
					$location.path('/admin/users/new');
				}
      })
		}
  }]);
