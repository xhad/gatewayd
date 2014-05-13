var Client = require('ripple-rest-client');
var gateway = require(__dirname+'/../../');



var Balance = function(){};

Balance.prototype.getAccountBalance = function(account, fn){
  var client = new Client({
    api: gateway.config.get('RIPPLE_REST_API'),
    account: account || gateway.config.get('HOT_WALLET').address
  });

  client.getAccountBalance(function(err, resp){
    if (err) {
      fn(err, null)
    } else {
      fn(null, resp);
    }
  });
};

Balance.prototype.getLiabilities = function(fn){
  var client = new Client({
    api: gateway.config.get('RIPPLE_REST_API'),
    account: gateway.config.get('COLD_WALLET')
  });

  client.getAccountBalance(function(err, resp){
    if (err) {
      fn (err, null)
    } else {
      fn(null, resp);
    }
  });
}

module.exports = new Balance();

