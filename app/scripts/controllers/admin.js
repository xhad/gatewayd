'use strict';

angular.module('publicApp')
  .controller('AdminCtrl', ['$scope', '$http', '$location', 'UserService', function ($scope, $http, $location, $user) {
    console.log($user);
    if (!$user.isLogged) { $location.path('/login') };
    function checkAdminExists() {
      $http.get("/api/v1/settings").success(function(resp){
        console.log('settings', resp);
        $scope.adminExists = resp.settings.adminExists
        $scope.coldWallet = resp.settings.coldWallet;
        $scope.hotWallet = resp.settings.hotWallet;
        $scope.loading = false
      })
    }

    $scope.users = [];
    $scope.rippleAddresses = [];
    $scope.payments = [];
    $scope.balances = [];
    $scope.deposits = [];
    $scope.withdrawals = [];
    $scope.externalAccounts = [];
    $scope.users = [];

    function getUsers() {

    }
    function getRippleAddresses(){

    }
    function getPayments(){

    }
    function getBalances(){

    }
    function getDeposits(){

    }
    function getWithdrawals(){

    }
    function getExternalAccounts(){

    }

    checkAdminExists()

    $scope.loading = true
    $scope.adminExists = false
    $scope.admin = { email: '' }

    $scope.user = {}
    $scope.userService = $user

    $scope.logout = function() {
      $user.logout()
    }

    $scope.registerAdmin = function() {
      if ($scope.admin.email) {
        $http.post('/api/v1/admin/users', { email: $scope.admin.email }).success(function(resp) {
          alert("here is your admin password, save it right now! c582b4dd80459dc5fccacca210b3251297575bd86c2adc22d3384dc9a392d3d1");
          $location.path('/login');
          console.log(resp);
        })
      }
    }

    $scope.login = function () {
			var name = $scope.user.name;
			var password = $scope.user.password;
      $user.login(name, password, function(err, session){
        if (!!session.username) {
					$location.path('/gateway/account');
				} else {
					$location.path('/admin/users/new');
				}
      })
		}
  }]);
