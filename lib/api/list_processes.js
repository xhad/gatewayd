var GatewayProcessManager = require(__dirname+'/../process_manager.js');

/**\
 * @requires GatewayProcessManager
 * @function listProcesses
 *
 * @description Looks into the process manager and lists process that are `online`
 *
 * @param opts
 * @param fn
 */

function listProcesses(opts, fn) {
  processManager = new GatewayProcessManager();
  processManager.listProcesses(opts, fn);
}

module.exports = listProcesses;

