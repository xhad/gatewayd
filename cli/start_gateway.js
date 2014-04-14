
var GatewayProcessManager = require(__dirname+'/../lib/process_manager.js');

function startGateway(opts) {
  
  processManager = new GatewayProcessManager();
  processManager.start(opts);

}

module.exports = startGateway;

