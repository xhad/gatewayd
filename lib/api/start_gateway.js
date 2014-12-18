const ProcessManager = require(__dirname+'/../processes/process_manager.js');

/**
 * @function startGateway
 * @requires GatewayProcessManager
 * @description Starts gateway processes.
 * @param opts
 */

function startGateway() {
  console.log('Starting Gatewayd using PM2');
  var processManager = new ProcessManager();
  processManager.start();
}

module.exports = startGateway;

