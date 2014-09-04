var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var util = require('util');
var config = require(__dirname+'/../config/config.js');
const processSet = require(__dirname+'/processes/index.js');

function ProcessManager() {
  this.processSet = processSet;
  if (config.get('HTTP_SERVER')) {
    this.processSet.add('./processes/server.js');
  }
  if (config.get('WITHDRAWALS_CALLBACK_URL')) {
    this.processSet.add('./processes/withdrawal_callbacks_url.js');
  }
  if (config.get('RIPPLE_REST_PATH')) {
    this.processSet.add('./processes/ripple_rest.js');
  }
}

ProcessManager.prototype = { 
  constructor: ProcessManager,

  start: function() {
    this.processSet.toArray().forEach(function(path) {
      exec('pm2 --cron "0 * * * *" start '+ path);
    });
    util.puts('Starting gateway processes and running `pm2 list`...');
    setTimeout(function(){
      var pm2 = spawn('pm2', ['list']);
      pm2.stdout.on('data', function (data) {
        util.puts(data.toString());
      });
    }, 3000);
  },

  stop: function() {
    this.processSet.toArray().forEach(function(path) {
      exec('pm2 stop '+ path);
    });
    util.puts('Stopping gateway processes and running `pm2 list`...');
    setTimeout(function(){
      var pm2 = spawn('pm2', ['list']);
      pm2.stdout.on('data', function (data) {
        util.puts(data.toString());
      });
    }, 3000);
  },

  restart: function() {
    this.processSet.toArray().forEach(function(path) {
      exec('pm2 restart '+ path);
    });
    setTimeout(function(){
      var pm2 = spawn('pm2', ['list']);
      pm2.stdout.on('data', function (data) {
        util.puts(data.toString());
      });
    }, 3000);
  },

  listProcesses: function(opts, fn) {
    var command;
    if (typeof opts === 'function'){
      fn = opts;
      opts = { json: true };
    }
    if (opts.json){
      command = 'prettylist';
    } else {
      command = 'list';
    }
    var output = '';
    var pm2 = exec('pm2 '+command);
    pm2.stdout.on('data', function (data) {
      output += data;
    });
    pm2.on('close', function () {
      if (opts.json){
        fn(null, output);
      } else {
        fn(null, output);
      }
    });
  }
}

module.exports = ProcessManager;

