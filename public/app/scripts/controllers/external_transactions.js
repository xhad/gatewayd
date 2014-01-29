'use strict';

angular.module('publicApp')
  .controller('ExternalTransactionsCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'UserService', function ($scope, $http, $location, $route, $routeParams, $user) {
    $scope.externalDeposit = { deposit: true };
    $scope.externalWithdrawal = { deposit: false };

    $scope.createExternalDeposit = function() {
      console.log($scope.externalDeposit);
      var url = '/api/v1/users/'+$user.id+'/external_transactions';
      var deposit = new Object($scope.externalDeposit);
      console.log(deposit);
      deposit.user_id = $user.id;
      $http.get('/api/v1/users/'+$user.id+'/external_accounts').success(function(resp){
        deposit.external_account_id = resp.external_accounts[0].id;
        $http.post(url, deposit).success(function(error, response) {
          $location.path("/users"+$user.id);
        });
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
