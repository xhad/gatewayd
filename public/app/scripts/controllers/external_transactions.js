'use strict';

angular.module('publicApp')
  .controller('ExternalTransactionsCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'UserService', function ($scope, $http, $location, $route, $routeParams, $user) {
    $scope.externalDeposit = { deposit: true };
    $scope.externalWithdrawal = { deposit: false };

    $scope.createExternalDeposit = function() {
      console.log($scope.externalDeposit);
      var url = '/api/v1/users/'+$user.id+'/external_transactions';
      var deposit = new Object($scope.externalDeposit);
      deposit.user_id = $user.id;
      $http.post(url, deposit, function(err, response) {
        console.log(err); 
        console.log(response);
      });
    }

    $scope.createExternalWithdrawal = function() {
      console.log($scope.externalWithdrawal);
      $http.post('/api/v1/users/'+$user.id+'/external_transactions', {
        deposit: false,
        currency: $scope.externalWithdrawal.currency,
        amount: $scope.externalWithdrawal.amount
      },function(err, transaction) {
        console.log(err); 
        console.log(transaction);
      });
    }

    if ($user.isLogged) {

    } else {
      $location.path('/login');
    }

    //createRippleDeposit({});

  }]);
