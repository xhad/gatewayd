var RippleRestClient  = require('ripple-rest-client');
var uuid              = require('node-uuid');
var config            = require(__dirname+'/../../config/environment.js');

var rippleRestClient = new RippleRestClient({
  api: config.get('RIPPLE_REST_API'),
  account: config.get('COLD_WALLET')
});

/**
 * @requires config
 *
 * @function refundColdWallet
 *
 * @descriptions Refunds cold wallet
 *
 * @param {String} currency
 * @param {Number} amount
 * @param {callback} callabck
 */

function refundColdWallet(options, callback){

  var options = {
    secret: config.get('HOT_WALLET').secret,
    client_resource_id: uuid.v4(),
    payment: {
      source_account: config.get('HOT_WALLET').address,
      destination_account: config.get('COLD_WALLET'),
      destination_amount: {
        value: options.amount.toString(),
        currency: options.currency,
        issuer: config.get('COLD_WALLET')
      },
      destination_tag: '0'
    }
  };

  rippleRestClient.sendAndConfirmPayment(options, function(error, response){
    if (error || (response.result !== 'tesSUCCESS')) {
      logger.error('rippleRestClient.sendAndConfirmPayment', error);
      return callback(error, null);
    }
    callback(null, response);
  });
}

module.exports = refundColdWallet;

