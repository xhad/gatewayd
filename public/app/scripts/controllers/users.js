'use strict';

angular.module('publicApp')
  .controller('UsersCtrl', ['$scope', '$http', '$location', '$routeParams', 'UserService', function ($scope, $http, $location, $user, $routeParams) {
    console.log('user id', $routeParams.id);
    if ($user) {
      console.log('user is logged in');
      if (($user.id == $routeParams.id) || $user.admin) {
        console.log('user is allowed to access this resource');
      } else {
        $location.path = '/users/'+$user.id; 
      }
    } else {
      $location.path = '/login';
    }

  }]);
