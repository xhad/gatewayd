var GatewayProcessManager = require(__dirname+'/../process_manager.js');

function startGateway(opts) {
  processManager = new GatewayProcessManager();
  processManager.start(opts);
}

module.exports = startGateway;

