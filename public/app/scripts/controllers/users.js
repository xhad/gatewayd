'use strict';

angular.module('publicApp')
  .controller('UsersCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'UserService', function ($scope, $http, $location, $route, $routeParams, $user) {
    $scope.user = $user;
    if ($user.isLogged) {
      if (($user.id == $routeParams.id) || $user.admin) {
        $scope.user.balances = [];
        $scope.user.ripple_transactions = [];
        $scope.user.external_transaction = [];
        $scope.user.external_accounts = [];
        $scope.user.ripple_addresses = [];

        getExternalTransactions();
        getRippleTransactions();
        getBalances();
        console.log($scope.user);
      } else {
        $location.path('/users/'+$user.id);
      }
    } else {
      $location.path('/login');
    }

    function getExternalTransactions() {
      $http.get('/api/v1/users/'+$user.id+'/external_transactions').success(function(resp){
        $scope.user.external_transactions = resp.external_transactions;
      });
    }

    function getRippleTransactions() {
      $http.get('/api/v1/users/'+$user.id+'/ripple_transactions').success(function(resp){
        $scope.user.ripple_transactions = resp.ripple_transactions;
      });
    }

    function getBalances() {
      $http.get('/api/v1/users/'+$user.id+'/balances').success(function(resp){
        $scope.user.balances = resp.balances.external;
      });
    }

  }]);
