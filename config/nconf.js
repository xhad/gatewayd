var nconf = require('nconf');

nconf
  .env()
  .file({ file: './config/config.json' });

nconf.defaults({
  'RIPPLE_REST_API': 'http://localhost:5990',
  'DATABASE_URL': 'postgres://postgres:password@localhost:5432/ripple_gateway',
  'RIPPLE_DATAMODEL_ADAPTER': 'ripple-gateway-data-sequelize-adapter',
  'RIPPLE_EXPRESS_GATEWAY': 'ripple-gateway-express',
  'SSL': true,
  'PORT': 5000
});

module.exports = nconf;
