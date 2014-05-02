var nconf = require('nconf');

nconf
  .file({ file: __dirname+'/config.json' })
  .env();

nconf.defaults({
  'RIPPLE_REST_API': 'http://localhost:5990/',
  'RIPPLE_REST_PATH': null,
  'RUN_RIPPLE_REST': false,
  'DATABASE_URL': 'postgres://postgres:password@localhost:5432/ripple_gateway',
  'RIPPLE_DATAMODEL_ADAPTER': 'ripple-gateway-data-sequelize',
  'SSL': true,
  'SSL_KEY_PATH': __dirname+'/../env/certs/server.key',
  'SSL_CERTIFICATE_PATH': __dirname+'/../env/certs/server.crt',
  'HTTP_SERVER': true, // Serve http/json api
  'BASIC_AUTH': false, // Require admin key for http api
  'KEY': false, // Required for BASIC_AUTH
  'USER_AUTH': true, // Require username/password auth for user routes
  'PORT': 5000, // Port of http api server
  'HOST': 'localhost',
  'DOMAIN': 'example.com', // Domain of gateway, for ripple.txt and auth
  'HOT_WALLET': { address: false, secret: false }, // Required
  'COLD_WALLET': false, // Required
  'CURRENCIES': false, // Required
  'WITHDRAWAL_FEE': 0.01, // Required
  'DEPOSIT_FEE': 0.01, // Required
  'WITHDRAWALS_CALLBACK_URL': null, // URL to POST callback of withdrawals
  'WITHDRAWALS_CALLBACK_CERTIFICATE': null // Used to validate SSL on callbacks
});

module.exports = nconf;
