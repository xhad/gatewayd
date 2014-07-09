var RippleRestClient = require('ripple-rest-client');
var ripple = require(__dirname+'/../ripple/');
var uuid = require('node-uuid');
var config = require(__dirname+'/../../config/config.js');

var rippleRestClient = new RippleRestClient({
  account: config.get('COLD_WALLET')
});

function fundHotWallet(amount, currency, secret, callback) {

  var options = {
    secret: secret,
    client_resource_id: uuid.v4(),
    payment: {
      destination_account: config.get('HOT_WALLET').address,
      source_account: config.get('COLD_WALLET'),
      destination_amount: {
        value: amount.toString(),
        currency: currency
      }
    }
  };

  rippleRestClient.sendAndConfirmPayment(options, function(error, response){
    if (error || (response.result != 'tesSUCCESS')) {
      logger.error('rippleRestClient.sendAndConfirmPayment', error);
      return callback(error, null);
    }
    callback(null, response);
  });
}

module.exports = fundHotWallet;
