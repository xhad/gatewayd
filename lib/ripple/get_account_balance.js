var Client = require('ripple-rest-client');
var gateway = require(__dirname+'/../../');

var client = new Client({
  api: gateway.config.get('RIPPLE_REST_API'),
  account: gateway.config.get('HOT_WALLET').address
});

function getAccountBalance(fn){
  client.getAccountBalance(function(err, resp){
    if (err) {
      fn (err, null)
    } else {
      fn(null, resp);
    }
  });
}

module.exports = getAccountBalance;

