'use strict';

angular.module('publicApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users/:id', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationCtrl'
      })
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
			})
			.when('/api/docs', {
				templateUrl: 'views/api.html',
				controller: 'ApiDocsCtrl'
			})
      .when('/ripple/deposit', {
        templateUrl: 'views/ripple/deposit.html',
        controller: 'RippleTransactionsCtrl'
      })
      .when('/ripple/withdraw', {
        templateUrl: 'views/ripple/withdraw.html',
        controller: 'RippleTransactionsCtrl'
      })
      .when('/external/deposit', {
        templateUrl: 'views/external/deposit.html',
        controller: 'ExternalTransactionsCtrl'
      })
      .when('/external/withdraw', {
        templateUrl: 'views/external/withdraw.html',
        controller: 'ExternalTransactionsCtrl'
      })
      .otherwise({
        redirectTo: '/users/-1'
      });
  });
