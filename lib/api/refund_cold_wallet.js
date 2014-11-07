var ripple = require(__dirname+'/../ripple/');
var config = require(__dirname+'/../../config/environment.js');
var RippleRestClient = require('ripple-rest-client');
var uuid = require('node-uuid');

/**
 * @requires ripple, config
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

  var rippleRestClient = new RippleRestClient({
    api: config.get('RIPPLE_REST_API'),
    account: config.get('HOT_WALLET').address,
    secret: config.get('HOT_WALLET').secret
  });


  var paymentObject = {
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

  rippleRestClient.sendAndConfirmPayment(paymentObject, callback);

}

module.exports = refundColdWallet;

