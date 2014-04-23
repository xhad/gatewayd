var nconf = require('nconf');

nconf
  .file({ file: __dirname+'/config.json' })
  .env();

nconf.defaults({
  'RIPPLE_REST_API': 'http://localhost:5990/',
  'DATABASE_URL': 'postgres://postgres:password@localhost:5432/ripple_gateway',
  'RIPPLE_DATAMODEL_ADAPTER': 'ripple-gateway-data-sequelize',
  'SSL': true,
  'SSL_KEY_PATH': __dirname+'/../certs/server.key',
  'SSL_CERTIFICATE_PATH': __dirname+'/../certs/server.crt',
  'PORT': 5000,
  'HOST': 'localhost',
  'DOMAIN': 'example.com'
});

module.exports = nconf;
