'use strict';

angular.module('publicApp')
  .controller('LoginCtrl', ['$scope', '$http', '$location', 'UserService', function ($scope, $http, $location, $user) {
    $scope.user = {}

    $user.updateSession(function(user){
      if (user.isLogged){
        console.log('user is logged in from the session')
        $user.
        $location.path('/gatway_account');
      } 
    })

    $scope.login = function () {
			var name = $scope.user.name;
			var password = $scope.user.password;
      $user.login(name, password, function(err, session){
        if (!!session.username) {
					$location.path('/gatway_account');
				} else {
					$location.path('/admin/users/new');
				}
      })
		}
  }]);
