'use strict';

angular.module('publicApp')
  .controller('BankTxsCtrl', ['$scope', '$http', '$location', 'UserService', function ($scope, $http, $location, $user) {
    if (!$user.admin) { $location.path('/login') }
		$scope.bankTransactions = [];

		function getBankTransactions() {
			$http.get('/api/v1/bank_transactions')
			.success(function(bankTransactions) {
				$scope.bankTransactions = bankTransactions;
			})
			.error(function(err) {
				console.log({ error: err });
			});
		}

		getBankTransactions();
  }]);
