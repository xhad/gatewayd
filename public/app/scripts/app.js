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
        templateUrl: 'views/user.html',
        controller: 'UsersCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin/settings.html',
        controller: 'AdminCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register',
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
      .otherwise({
        redirectTo: '/api/docs'
      });
  });
