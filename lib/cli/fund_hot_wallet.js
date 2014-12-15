var RippleRestClient = require('ripple-rest-client');
var PrettyPrintTable = require(__dirname+'/../views/text/');
var gateway = require(__dirname+'/../../');
var async = require('async');

var rippleRestClient = new RippleRestClient({
  api: gateway.config.get('RIPPLE_REST_API'),
  account: gateway.config.get('HOT_WALLET').address
});

function fundHotWallet(amount, currency, secret, callback) {
  var options = {
    amount: amount,
    currency: currency,
    secret: secret
  };

  async.waterfall([
    function(next){
      gateway.api.fundHotWallet(options, next);
    },
    function(){
      rippleRestClient.getAccountBalance(function(error, balances) {
        if (error) {
          return callback(error, null);
        } else {
          PrettyPrintTable.balances(balances.balances);
        }
      });
    }
  ], callback);

}

module.exports = fundHotWallet;
