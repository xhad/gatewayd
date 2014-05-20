var GatewayProcessManager = require(__dirname+'/../process_manager.js');

function restartGateway(opts) {
  processManager = new GatewayProcessManager();
  processManager.restart(opts);
}

module.exports = restartGateway;

