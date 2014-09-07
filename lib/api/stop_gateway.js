var ProcessManager = require(__dirname+'/../processes/process_manager.js');
/**
 * @function stopGateway
 * @description Halts all pocesses.
 * @param opts
 */
function stopGateway() {
  var processManager = new ProcessManager();
  processManager.stop();
}

module.exports = stopGateway;

