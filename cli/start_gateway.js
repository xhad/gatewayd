
var exec = require('child_process').exec;

function startGateway() {
  
  processManager = new GatewayProcessManager();
  processManager.start();

}

module.exports = startGateway;

