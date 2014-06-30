var winston = require('winston');
var config = require(__dirname + '/../../config/config.js');

winston.add(winston.transports.File, { filename: __dirname + '../../../logs/' + config.get('ENVIRONMENT') + '.log' });

module.exports = winston;
