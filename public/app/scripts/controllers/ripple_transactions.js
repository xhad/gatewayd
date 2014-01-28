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
      opts.from_issuer = 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk';
      opts.from_address = 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk';

      opts.to_currency = $scope.rippleWithdrawal.currency;
      opts.to_amount = parseFloat($scope.rippleWithdrawal.amount);
      opts.to_issuer = 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk';
      opts.to_address = 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk';
      opts.issuance = true;

      opts.to_address = $scope.rippleWithdrawal.ripple_address;
      opts.from_address = $scope.rippleWithdrawal.ripple_address;

      opts.ripple_address_id = 3;
      

      $http.post('/api/v1/users/'+$user.id+'/ripple_transactions', opts).success(function(err, transaction) {
        console.log(err);
        console.log(transaction);
      });
      $location.path('/users/'+$user.id);
    }
  }]);
