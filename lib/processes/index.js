var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var forever = require('forever');
var util = require('util');

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
    
    exec('pm2 start '+ __dirname+'/../../processes/'+name+'.js --name '+name);

  });

  util.puts('Starting gateway processes and running `pm2 list`...');
  setTimeout(function(){
    pm2 = spawn('pm2', ['list']);
    pm2.stdout.on('data', function (data) {
      util.puts(data.toString());
    });
  }, 3000);
}

module.exports = GatewayProcessManager;

