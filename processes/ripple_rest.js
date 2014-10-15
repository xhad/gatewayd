const gatewayd = require(__dirname+'/../');
const exec = require('child_process').exec;
const rippleRestPath = gatewayd.config.get('RIPPLE_REST_PATH') || __dirname+'/../node_modules/ripple-rest/';

exec('cd '+rippleRestPath+' && node server.js', function(error, stdout) {
  if (error) {
    gatewayd.logger.error(error);
  } else {
    gatewayd.logger.info(stdout);
  }
});

logger.info('Running Ripple REST on http://localhost:5990');

