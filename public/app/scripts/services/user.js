angular.module('publicApp').service('UserService', ['$http','$location', function($http, $location) {
  var user = {
    isLogged: false,
    username: '',

    updateSession: function(fn){
      $http.get('/api/v1/sessions').success(function(resp){
        console.log('response')
        console.log(resp)
        if (resp.success && resp.session) {
          console.log('yes')
          console.log(user)
          user.isLogged = true
          user.username = resp.session.username
          console.log('user',user)
          $location.path('/gateway_account')
        }
      })
    },

    login: function(username, password) {
			$http.post('/api/v1/sessions', {
				name: username,
				password: password
			}).success(function(response){
        if (!!response.session.username) {
          user.isLogged = true,
          user.username = username
          console.log('about to redirect to /gateway_account')
					$location.path('/gateway_account');
				} else {
					$location.path('/admin/users/new');
				}
			}).error(function(){
    
      })
    }
  } 
  return user
}])
