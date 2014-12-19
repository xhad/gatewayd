var winston   = require('winston');
var config    = require(__dirname + '/../../config/environment.js');
var features  = require(__dirname + '/../../lib/features.js');
require('winston-loggly');

winston.add(winston.transports.File, { filename: __dirname + '../../../logs/' + config.get('NODE_ENV') + '.log' });

//To enable this feature, set `raygun: true` in ./config/features.json
if (features.isEnabled('raygun')) {
  const Raygun    = require('winston-raygun');

  if (config.get('RAYGUN_KEY')) {
    winston.add(Raygun, {
      apiKey: config.get('RAYGUN_KEY')
    });
  } else {
    throw new Error('Raygun Key not found!');
  }
}

if (config.get('LOGGLY')) {
  winston.add(winston.transports.Loggly, {
    subdomain: config.get('LOGGLY').subdomain,
    auth: config.get('LOGGLY').auth,
    inputToken: config.get('LOGGLY').inputToken
  });
}

winston.fatal = function(error) {
  winston.error('======================');
  winston.error(error.message);
  winston.error('CRASHING GATEWAYD');
  winston.error('======================');
  process.exit(0);
};

global.logger  = winston;
module.exports = winston;
