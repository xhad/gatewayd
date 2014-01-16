'use strict';

angular.module('publicApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/gateway/users/new', {
        templateUrl: 'views/gateway/users/new.html',
        controller: 'GatewayNewUserCtrl'
      })
      .when('/gateway/account', {
        templateUrl: 'views/gateway/account.html',
        controller: 'GatewayAccountsCtrl'
      })
      .when('/gateway/deposit', {
        templateUrl: 'views/gateway/deposit.html',
        controller: 'GatewayDepositCtrl'
      })
      .when('/gateway/withdraw', {
        templateUrl: 'views/gateway/withdraw.html',
        controller: 'GatewayWithdrawCtrl'
      })
      .when('/ripple/account', {
        templateUrl: 'views/ripple/account.html',
        controller: 'RippleAccountsCtrl'
      })
      .when('/admin/gateway/withdrawals', {
        templateUrl: 'views/admin/gateway/withdrawals/new.html',
        controller: 'AdminGatewayWithdrawalsCtrl'
      })
      .when('/admin/gateway/accounts/:account_id/balances', {
        templateUrl: 'views/balances.html',
        controller: 'BalancesCtrl'
      })
      .when('/admin/gateway/users', {
        templateUrl: 'views/users.html',
        controller: 'AdminGatewayUsersCtrl'
      })
			.when('/admin/gateway/transactions', {
				templateUrl: 'views/bank_transactions.html',
				controller: 'BankTxsCtrl'
			})
			.when('/admin/ripple/transactions', {
				templateUrl: 'views/ripple_transactions.html',
				controller: 'RippleTxsCtrl'
			})
			.when('/api/docs', {
				templateUrl: 'views/api.html',
				controller: 'ApiDocsCtrl'
			})
			.when('/admin/gateway/withdrawals/new', {
				templateUrl: 'views/withdrawals/new.html',
				controller: 'AdminWithdrawalsCtrl'
			})
			.when('/admin/gateway/deposits/new', {
				templateUrl: 'views/deposits/new.html',
				controller: 'AdminDepositsCtrl'
			})
			.when('/admin/gateway/accounts', {
				templateUrl: 'views/admin/bank_accounts/index.html',
				controller: 'AdminGatewayAccountsCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
			})
      .otherwise({
        redirectTo: '/'
      });
  });
