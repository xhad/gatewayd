var GatewayProcessManager = require(__dirname+'/../process_manager.js');

function listProcesses(opts, fn) {
  processManager = new GatewayProcessManager();
  processManager.listProcesses(opts, fn);
}

module.exports = listProcesses;

