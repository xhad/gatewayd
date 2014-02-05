var nconf = require('nconf');

nconf
  .env()
  .file({ file: './config/config.json' });

nconf.defaults({
  'RIPPLE_REST_API': 'http://localhost:5990',
  'DATABASE_URL': 'postgres://username:password@localhost:5432/ripple_gateway',
  'SSL': true
});

module.exports = nconf;
