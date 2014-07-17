var GatewayProcessManager = require(__dirname+'/../process_manager.js');

/**
 * @function startGateway
 * @requires GatewayProcessManager
 * @description Starts gateway processes.
 * @param opts
 */

function startGateway(opts) {
  var processManager = new GatewayProcessManager();
  processManager.start(opts);
}

module.exports = startGateway;

