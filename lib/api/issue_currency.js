var config = require(__dirname+'/../../config/environment.js');
var RippleRestClient = require('ripple-rest-client');
var uuid = require('node-uuid');

/**
* @requires ripple
* Issue Currency from Cold Wallet to Hot Wallet
* - the cold wallet's secret must be provided
*
* @param {string} currency
* @param {decimal} amount
* @param {string} secret
* @param {function(err, deposit)} callback
* @returns [Withdrawals]
*/

function issueCurrency(amount, currency, secret, callback) {
  var rippleRestClient = new RippleRestClient({
    api: config.get('RIPPLE_REST_API'),
    account: config.get('COLD_WALLET')
  });

  var options = {
    secret: secret,
    client_resource_id: uuid.v4(),
    payment: {
      destination_account: config.get('HOT_WALLET').address,
      source_account: config.get('COLD_WALLET'),
      destination_amount: {
        value: amount.toString(),
        currency: currency,
        issuer: config.get('COLD_WALLET')
      }
    }
  };

  rippleRestClient.sendAndConfirmPayment(options, callback);
}

module.exports = issueCurrency;

