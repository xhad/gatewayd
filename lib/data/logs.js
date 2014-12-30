var winston   = require('winston');
var config    = require(__dirname + '/../../config/environment.js');
var features  = require(__dirname + '/../../lib/features.js');
var fs        = require('fs');
var path      = require('path');
require('winston-loggly');

var logDirectory, logFile, Raygun;

if (!config.get('NODE_ENV').match('test')) {
  logDirectory = path.join(__dirname,'/../../logs');

  if (!fs.existsSync(logDirectory)) {
    console.log('mkdir', logDirectory);
    fs.mkdirSync(logDirectory);
  }

  logFile = path.join(__dirname,'/../../logs/'+config.get('NODE_ENV')+'.log');

  if (!fs.existsSync(logFile)) {
    console.log('touch', logFile);
    fs.closeSync(fs.openSync(logFile, 'w'));
  }

  winston.add(winston.transports.File, { filename: __dirname + '../../../logs/' + config.get('NODE_ENV') + '.log' });
}

//To enable this feature, set `raygun: true` in ./config/features.json
if (features.isEnabled('raygun')) {
  Raygun = require('winston-raygun');

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

global.logger  = winston;
module.exports = winston;
