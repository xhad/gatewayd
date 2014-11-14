var Client = require('ripple-rest-client');
var config = require(__dirname+'/../../config/environment');

module.exports = function getLiabilities(fn) {
  var client = new Client({
    api: config.get('RIPPLE_REST_API'),
    account: config.get('COLD_WALLET')
  });

  client.getAccountBalance(function(err, resp){
    if (err) {
      fn (err, null);
    } else {
      fn(null, resp);
    }
  });
};

