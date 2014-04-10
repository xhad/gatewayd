
var GatewayProcessManager = require("../lib/process_manager.js");

function startGateway() {
  
  processManager = new GatewayProcessManager();
  processManager.start();

}

module.exports = startGateway;

