'use strict';

angular.module('publicApp')
  .controller('AdminDepositsCtrl', ['$scope', '$http', 'UserService', '$location', 'Base64', function ($scope, $http, $user, $location, Base64) {
    if (!$user.admin) { $location.path('/login') }
		$scope.deposits = [];

		function getDeposits() {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($user.username+':'+$user.password);
			$http.get('/api/v1/gateway/deposits')
			.success(function(resp) {
				$scope.deposits = resp.externalTransactions;
			})
			.error(function(err) {
				console.log({ error: err });
			});
		}

    $scope.createDeposit = function () {
			var bankAccountId = $scope.deposit.bankAccountId;
			var currency = $scope.deposit.currency;
			var cashAmount = $scope.deposit.cashAmount;
      $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($user.username+':'+$user.password);
			$http.post('/api/v1/gateway/transactions/deposit', { 
				currency: currency, 
				cashAmount: cashAmount,
				accountId: bankAccountId
			})	
			.success(function(response){
				console.log(response);
				getDeposits();
			})
			.error(function(err){
				console.log({ error: err });
			});
		}

		getDeposits();
  }]);
