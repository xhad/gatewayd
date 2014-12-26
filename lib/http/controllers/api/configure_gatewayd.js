const responseHandler = require(__dirname+'/../../response_handler');
var configureGatewayd = require(__dirname+'/../../../api/configure_gatewayd.js');

module.exports = function(request, response) {
  configureGatewayd.set(request.body)
    .then(function(configuration) {
      responseHandler.success(response, { configurations: configuration });
    })
    .error(function(error) {
      responseHandler.invalidRequest(response, error.message);
    });
};
