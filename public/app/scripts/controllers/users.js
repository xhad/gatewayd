'use strict';

angular.module('publicApp')
  .controller('UsersCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'UserService', function ($scope, $http, $location, $route, $routeParams, $user) {
    $scope.user = $user;
    if ($user.isLogged) {
      if (($user.id == $routeParams.id) || $user.admin) {
        // do ALL THE THINGS!
        setupDashboard();
        console.log($scope.user);
      } else {
        $location.path('/users/'+$user.id);
      }
    } else {
      $location.path('/login');
    }

    function setupDashboard() {
      $scope.user.balances = [{ currency: 'USD', amount: 1510 }, { currency: 'XAG', amount: 75 }];
      $scope.user.ripple_transactions = [];
      $scope.user.external_transaction = [];
      $scope.user.external_accounts = [];
      $scope.user.ripple_addresses = [];
    }

  }]);
