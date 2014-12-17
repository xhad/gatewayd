var gatewayd = require(__dirname+'/../../');

const RESTART_TIMEOUT = 1000;

module.exports = function() {
  if (gatewayd.features.isEnabled('supervisor')) {
    gatewayd.logger.info('Starting Gatewayd using Supervisor');
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
        var fileModule = require(__dirname+'/../../processes/'+path);
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
    gatewayd.api.startGateway();
  }
};

