var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

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

    var process = spawn('node', [__dirname+'/../processes/'+name]); 

    manager.processes[name] = process.pid;

    process.stdout.on('data', function(data){
      console.log(name.toUpperCase()+' :', data.toString());
    });

    process.stderr.on('data', function(data){
      console.log(name.toUpperCase()+' :', data.toString());
    });

  });

  console.log(manager.processes);

}

module.exports = GatewayProcessManager;

