var GatewayProcessManager = require(__dirname+'/../process_manager.js');

/**
 * @requires GatewayProcessManager
 *
 * @function restartGateway
 * @description Restarts all running processes by executing `pm2 kill` followed by `bin/gateway start`
 * @param opts
 */

function restartGateway(opts) {
  processManager = new GatewayProcessManager();
  processManager.restart(opts);
}

module.exports = restartGateway;

