var nconf = require('nconf');

nconf
  .env()
  .file({ file: './gateway.json' });

nconf.defaults({
  'RIPPLE_REST_API': 'http://localhost:5990',
  'DATABASE_URL': 'postgres://username:password@localhost/ripple_gateway'
});

module.exports = nconf;
