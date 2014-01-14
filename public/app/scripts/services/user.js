angular.module('publicApp').service('UserService', ['$http', function($http) {
  var user = {
    isLogged: false,
    username: ''
  } 
  return user
}])
