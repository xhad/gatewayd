'use strict';

angular.module('publicApp')
  .controller('AdminGatewayWithdrawalsCtrl', ['$scope', '$http', '$locatin', 'UserService', function ($scope, $http, $location, $user) {
    if (!$user.admin) { $location.path('/login') }
		$scope.deposits = [];

		function getDeposits() {
			$http.get('/api/v1/gateway/deposits')
			.success(function(deposits) {
				$scope.deposits = deposits;
			})
			.error(function(err) {
				console.log({ error: err });
			});
		}

    $scope.createDeposit = function () {
			var bankAccountId = $scope.deposit.bankAccountId;
			var currency = $scope.deposit.currency;
			var cashAmount = $scope.deposit.cashAmount;
			$http.post('/api/v1/gateway/deposits', { 
				currency: currency, 
				cashAmount: cashAmount,
				bankAccountId: bankAccountId
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
