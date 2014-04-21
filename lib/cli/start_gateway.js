
var GatewayProcessManager = require(__dirname+'/../processes/');

function startGateway(opts) {
  
  processManager = new GatewayProcessManager();
  processManager.start(opts);

}

module.exports = startGateway;

