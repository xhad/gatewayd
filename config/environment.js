/* jshint -W079 */

var nconf = require('nconf');

nconf
  .file({ file: __dirname+'/config.json' })
  .env();

var DBConfigFile = require(__dirname+'/../lib/data/database.json');
var dbConfig = DBConfigFile[nconf.get('NODE_ENV')];

nconf.defaults({
  'ENVIRONMENT': 'production',
  'RIPPLE_REST_API': 'https://api.ripple.com/',
  'DATABASE_USER': dbConfig.user,
  'DATABASE_PASSWORD': dbConfig.password,
  'DATABASE_NAME': dbConfig.database,
  'DATABASE_HOST': dbConfig.host,
  'DATABASE_PORT': dbConfig.port,
  'DATABASE_DIALECT': dbConfig.dialect,
  'DATABASE_LOGGING': dbConfig.logging,
  // DEPRECATED: Use DATABASE_{USER|PASSWORD|...} instead.
  'DATABASE_URL': null,
  'NODE_ENV': 'development',
  'SSL': true,
  'SSL_KEY_PATH': __dirname+'/../env/certs/server.key',
  'SSL_CERTIFICATE_PATH': __dirname+'/../env/certs/server.crt',
  'HTTP_SERVER': true, // Serve http/json api
  'BASIC_AUTH': true, // Require admin key for http api
  'KEY': false, // Required for BASIC_AUTH
  'USER_AUTH': false, // Enable user routes with name/password basic auth
  'WEBAPP': true,
  'WEBAPP_PATH': __dirname + '/../node_modules/gatewayd-admin/',
  'PORT': 5000, // Port of http api server
  'HOST': 'localhost',
  'DOMAIN': 'example.com', // Domain of gateway, for ripple.txt and auth
  'HOT_WALLET': { address: false, secret: false }, // Required
  'COLD_WALLET': null, // Required
  'CURRENCIES': null, // Required
  'WITHDRAWAL_FEE': 0.01, // Required - default 1%
  'DEPOSIT_FEE': 0.01, // Required - default 1%
  'LOGGLY': false
});

module.exports = nconf;
