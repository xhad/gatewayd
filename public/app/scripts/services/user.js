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
			$http.post('/api/v1/gateway/users/login').success(function(resp){
        if (resp.success) {
          user.isLogged = true
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
