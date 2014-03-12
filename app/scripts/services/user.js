angular.module('publicApp').service('UserService', ['$http','$location', 'Base64', function($http, $location, Base64) {
  var user = {
    isLogged: false,
    username: '',

    logout: function() {
      user.isLogged = false
      user.username = ''
      user.admin = false
      user.password = ''
      $location.path("/login")
    },

    login: function(username, password) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(username+':'+password)
			$http.get('/api/v1/users').success(function(resp){
        if (resp.admin) {
          user.isLogged = true;
          user.admin = true;
          $location.path('/admin'); 
        } else if (resp.user) {
          user.isLogged = true;
          user.username = resp.user.name
          user.admin = resp.user.admin
          user.id = resp.user.id
          user.password = password
					$location.path('/users/'+user.id);
				} else {
					$location.path('/register');
				}
			}).error(function(){

      })
    }
  }
  return user
}])
