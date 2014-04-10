var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

function GatewayProcessManager() {

  this.defaultProcesses = [
    "ripple_rest",
    "deposits",
    "outgoing",
    "incoming",
    "withdrawals",
    "webapp"
  ];

  this.processes = {};

}

GatewayProcessManager.prototype.start = function() {

  var manager = this;
  
  manager.defaultProcesses.forEach(function(name) {

    var process = spawn('node', [__dirname+'/../processes/'+name]); 

    manager.processes[name] = process.pid;

  });

  console.log(manager.processes);

}

module.exports = GatewayProcessManager;

