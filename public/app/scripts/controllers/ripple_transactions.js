'use strict';

angular.module('publicApp')
  .controller('RippleTransactionsCtrl', ['$scope', '$http', '$location', '$route', '$routeParams', 'UserService', function ($scope, $http, $location, $route, $routeParams, $user) {
    $scope.user = $user;

    function createRippleDeposit(opts) {
      $http.post('/api/v1/ripple_transactions', { form: {
        deposit: true    
      }},function(err, transaction) {
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
