var GatewayProcessManager = require(__dirname+'/../process_manager.js');
/**
 * @function stopGateway
 * @description Halts all pocesses.
 * @param opts
 */

function stopGateway(opts) {
  var processManager = new GatewayProcessManager();
  processManager.stop(opts);
}

module.exports = stopGateway;

