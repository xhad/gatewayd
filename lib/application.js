var api = require(__dirname+'/api');
var features = require(__dirname+'/features');
var logger = require(__dirname+'/data/logs');
var RESTART_TIMEOUT = 1000;

module.exports = function(gatewayd) {

  function Application() {}

  Application.prototype.start = function() {
    var _this = this;
    if (features.isEnabled('supervisor')) {
      logger.info('Starting Gatewayd using Supervisor');
      var DS = require('domain-supervisor');
      var supervisor = new DS.Supervisor();
      var processes = [
        'outgoing.js',
        'incoming.js',
        'server.js',
        'deposits.js'
      ];
      processes.forEach(function(path) {
        var coroutine = new DS.Process(function() {
          var fileModule = require(__dirname+'/../processes/'+path);
          if (typeof fileModule === 'function') {
            fileModule(gatewayd);
          }
        });
        supervisor.run(coroutine, function(error, restart) {
          logger.error('supervisor:exception', path, error.message);
          setTimeout(function() {
            logger.info('supervisor:restart', path);
            restart();
          }, RESTART_TIMEOUT);
        });
        logger.info('supervisor:start', path);
      });
    } else {
      console.log('FEATURE NOT ENABLED');
      api.startGateway();
    }
  };

  return Application;
}

