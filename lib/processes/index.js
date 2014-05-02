var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var forever = require('forever');
var util = require('util');
var config = require(__dirname+'/../../config/config.js');

function GatewayProcessManager() {

  this.processNames = [
    "deposits",
    "outgoing",
    "incoming",
    "withdrawals",
    "server"
  ];

  this.processes = {};

}

GatewayProcessManager.prototype.start = function(opts) {
  if (!opts) { opts = {}; };

  var manager = this;

  var processNames = opts.processes || manager.processNames;
  
  processNames.forEach(function(name) {
    exec('pm2 --cron "0 * * * *" start '+ __dirname+'/../../processes/'+name+'.js --name '+name);
  });

  if (config.get('WITHDRAWALS_CALLBACK_URL')) {
    exec('pm2 --cron "0 * * * *" start '+ __dirname+'/../../processes/withdrawal_callbacks.js --name callbacks');
  }

  if (config.get('RIPPLE_REST_PATH')) {
    var path = config.get('RIPPLE_REST_PATH');
    exec('pm2 --cron "0 * * * *" start '+path+'/server.js --name ripplerest');
  }

  util.puts('Starting gateway processes and running `pm2 list`...');
  setTimeout(function(){
    pm2 = spawn('pm2', ['list']);
    pm2.stdout.on('data', function (data) {
      util.puts(data.toString());
    });
  }, 3000);
}

GatewayProcessManager.prototype.stop = function(opts) {
  if (!opts) { opts = {}; };

  var manager = this;

  var processNames = opts.processes || manager.processNames;
  
  processNames.forEach(function(name) {
    
    exec('pm2 stop '+ __dirname+'/../../processes/'+name+'.js');

  });

  util.puts('Stopping gateway processes and running `pm2 list`...');
  setTimeout(function(){
    pm2 = spawn('pm2', ['list']);
    pm2.stdout.on('data', function (data) {
      util.puts(data.toString());
    });
  }, 3000);
}

GatewayProcessManager.prototype.restart = function(opts) {
  if (!opts) { opts = {}; };

  var manager = this;

  var processNames = opts.processes || manager.processNames;
  
  processNames.forEach(function(name) {
    
    exec('pm2 restart '+ __dirname+'/../../processes/'+name+'.js');

  });

  util.puts('Restarting gateway processes and running `pm2 list`...');
  setTimeout(function(){
    pm2 = spawn('pm2', ['list']);
    pm2.stdout.on('data', function (data) {
      util.puts(data.toString());
    });
  }, 3000);
}

module.exports = GatewayProcessManager;

