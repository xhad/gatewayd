var ProcessManager = require(__dirname+'/../processes/process_manager.js');

/**
 * @requires ProcessManager
 *
 * @function restartGateway
 * @description Restarts all running processes by executing `pm2 kill` followed by `bin/gateway start`
 * @param opts
 */

function restartGateway() {
  var processManager = new ProcessManager();
  processManager.restart();
}

module.exports = restartGateway;

