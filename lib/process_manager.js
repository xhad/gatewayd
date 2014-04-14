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

GatewayProcessManager.prototype.start = function(opts) {
  if (!opts) { opts = {}; };

  var manager = this;

  var processNames = opts.processes || manager.processNames;
  
  processNames.forEach(function(name) {

    child = new (forever.Monitor)(__dirname+'/../processes/'+name+'.js', {
        max: 3,
        silent: false,
        pidFile: __dirname+'/../processes/pids',
        options: []
    });

    child.on('start', function(process, data) { 

      manager.processes[name] = data.pid;
      console.log(name + ': '+data.pid);

    });

    child.start();

  });

}

module.exports = GatewayProcessManager;
