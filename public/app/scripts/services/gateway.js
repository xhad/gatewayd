angular.module('publicApp').service('GatewayService', ['$http', function($http) {

  function updateSettings() {
    $http.get("/api/v1/gateway/settings").success(function(resp) {
      console.log('got the settings');
      settings.hotWallet = resp.settings.hotWallet;
    });
  }

  var settings = {
    hotWallet: false,
    updateSettings: updateSettings 
  }

  updateSettings();

  return settings;
}])
