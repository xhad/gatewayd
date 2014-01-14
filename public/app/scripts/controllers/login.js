'use strict';

angular.module('publicApp')
  .controller('LoginCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.login = function () {
			var name = $scope.user.name;
			var password = $scope.user.password;
			var confirmation = $scope.user.password_confirmation;
			$http.post('/api/v1/sessions', {
				name: name,
				password: password
			}).success(function(response){
        console.log(response)
        if (!!response.session.username) {
					$location.path('/gatway_account');
				} else {
					$location.path('/admin/users/new');
				}
			})
		}
  }]);
