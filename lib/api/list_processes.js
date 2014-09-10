var GatewayProcessManager = require(__dirname+'/../processes/process_manager.js');

/**\
 * @requires GatewayProcessManager
 * @function listProcesses
 *
 * @description Looks into the process manager and lists process that are `online`
 * The node.js pm2 module is a daemon that runs and can restart failed processes
 * when they crash. By default several processes are started that represent
 * workers moving transactions through the gateway and their various states.
 *
 * - The `deposits` process takes newly recorded deposits and creates corresponding
 * ripple transactions
 * - The `withdrawals` processes takes newly recorded incoming ripple transactions
 * and creates corresponding external withrawal transactions.
 * - The `outgoing` process takes newly created outgoing ripple transaction
 * records in the gateway and attempts to send them to Ripple, recording the
 * resulting status and transaction hash.
 * - The `incoming` process polls Ripple REST for new transactions made to the
 * gateway's cold wallet address and records them in the ripple transactions table
 *
 * @param opts
 * @param fn
 */

function listProcesses(opts, fn) {
  var processManager = new GatewayProcessManager();
  processManager.listProcesses(opts, fn);
}

module.exports = listProcesses;

