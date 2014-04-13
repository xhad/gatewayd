var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var forever = require('forever');

function GatewayProcessManager() {

  this.processNames = [
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
  
  manager.processNames.forEach(function(name) {

    child = new (forever.Monitor)(__dirname+'/../processes/'+name, {
        max: 3,
        silent: true,
        options: []
    });

    child.on('start', function(process, data) { 

      manager.processes[name] = data.pid;

    });

    child.start();

  });

  console.log(manager.processes);

}

module.exports = GatewayProcessManager;
