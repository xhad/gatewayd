var GatewayProcessManager = require(__dirname+'/../process_manager.js');

/**
 * @function startGateway
 * @requires GatewayProcessManager
 * @description Starts gateway processes.
 * @param opts
 */

function startGateway(opts, fn) {
  processManager = new GatewayProcessManager();
  processManager.start(opts, function(err, processes){
    fn(null, processes);
  });

}

module.exports = startGateway;

