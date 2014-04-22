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
    
    exec('forever start '+ __dirname+'/../../processes/'+name+'.js');
    util.puts('started processes/'+name+'.js');

  });

}

module.exports = GatewayProcessManager;

