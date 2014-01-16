'use strict';

angular.module('publicApp')
  .controller('AdminGatewayAccountsCtrl', ['$scope', '$http', function ($scope, $http) {
		$scope.gatewayAccounts = [];
		$scope.gatewayAccount = {};

		function getGatewayAccounts() {
			$http.get('/api/v1/gateway/accounts')
			.success(function(resp) {
				$scope.gatewayAccounts = resp.gatewayAccounts;
			})
			.error(function(err) {
				console.log({ error: err });
			});
		}

		$scope.createGatewayAccount = function(){
			$http.post('/api/v1/gateway/accounts', $scope.gatewayAccount)
			.success(function(gatewayAccount){
			  console.log(gatewayAccount); 	
				getGatewayAccounts();
			})
			.error(function(err){
				console.log({ error: err });
			})
		}

		getGatewayAccounts();
  }]);
