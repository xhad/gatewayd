var GatewayProcessManager = require(__dirname+'/../process_manager.js');

function stopGateway(opts) {
  processManager = new GatewayProcessManager();
  processManager.stop(opts);
}

module.exports = stopGateway;

