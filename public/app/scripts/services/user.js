angular.module('publicApp').service('UserService', ['$http','$location', function($http, $location) {
  var user = {
    isLogged: false,
    username: '',

    login: function(username, password) {
      user = this
			$http.post('/api/v1/sessions', {
				name: username,
				password: password
			}).success(function(response){
        if (!!response.session.username) {
          this.isLogged = true,
          this.username = username
          console.log('about to redirect to /gateway_account')
					$location.path('/gatway_account');
				} else {
					$location.path('/admin/users/new');
				}
			}).error(function(){
    
      })
    }
  } 
  return user
}])
