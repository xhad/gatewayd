var exec = require('child_process').exec;

process.env.DATABASE_URL = null;

var serverPath = __dirname + '/../node_modules/ripple-rest/';

var command = 'cd '+ serverPath + ' && node server.js';

exec(command, function(err, stdout) {
  if (err) {
    logger.error(err);
  } else {
    logger.info(stdout);
  }
});

logger.info('Running Ripple REST on http://localhost:5990');
