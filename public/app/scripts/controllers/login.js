'use strict';

angular.module('publicApp')
  .controller('LoginCtrl', ['$scope', '$http', '$location', 'UserService', function ($scope, $http, $location, $user) {
    $scope.user = {}

    $scope.login = function () {
			var name = $scope.user.name;
			var password = $scope.user.password;
      $user.login(name, password, function(err, session){
        console.log(err)
        console.log(session)
        if (!!session.username) {
					$location.path('/gatway_account');
				} else {
					$location.path('/admin/users/new');
				}
      })
		}
  }]);
