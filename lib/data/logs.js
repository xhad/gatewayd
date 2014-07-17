var winston = require('winston');
var config = require(__dirname + '/../../config/config.js');

winston.add(winston.transports.File, { filename: __dirname + '../../../logs/' + config.get('ENVIRONMENT') + '.log' });

global.logger  = winston;
module.exports = winston;
