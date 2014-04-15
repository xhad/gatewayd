var nconf = require('nconf');

nconf
  .file({ file: __dirname+'/config.json' })
  .env();

nconf.defaults({
  'RIPPLE_REST_API': 'http://localhost:5990/',
  'DATABASE_URL': 'postgres://postgres:password@localhost:5432/ripple_gateway',
  'RIPPLE_DATAMODEL_ADAPTER': 'ripple-gateway-data-sequelize',
  'RIPPLE_EXPRESS_GATEWAY': 'ripple-gateway-express',
  'SSL': true,
  'PORT': 5000,
  'HOST': 'localhost',
  'domain': 'example.com'
});

module.exports = nconf;
