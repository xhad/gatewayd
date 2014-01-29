'use strict';

angular.module('publicApp')
  .controller('RippleTransactionsCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'UserService', 'GatewayService',function ($scope, $http, $location, $route, $routeParams, $user, $gateway) {
    if (!$user.isLogged) { $location.path('/login') };

    $scope.user = $user;
    $scope.rippleWithdrawal = {};
    console.log($gateway);
    $scope.hotWallet = $gateway.hotWallet;

    $scope.createRippleWithdrawal = function() {
      var opts  = {};
      opts.from_currency = $scope.rippleWithdrawal.currency;
      opts.from_amount = parseFloat($scope.rippleWithdrawal.amount);
      opts.from_issuer = $gateway.hotWallet;
      opts.from_address = $gateway.hotWallet;

      opts.to_currency = $scope.rippleWithdrawal.currency;
      opts.to_amount = parseFloat($scope.rippleWithdrawal.amount);
      opts.to_issuer = $gateway.hotWallet;
      opts.issuance = true;

      opts.to_address = $scope.rippleWithdrawal.ripple_address;

      $http.get('/api/v1/users/'+$user.id+'/ripple_addresses').success(function(res){
        opts.ripple_address_id = res.ripple_addresses[0].id;
        $http.post('/api/v1/users/'+$user.id+'/ripple_transactions', opts).success(function(err, transaction) {
          $location.path('/users/'+$user.id);
        });
        
      });
    }
  }]);
