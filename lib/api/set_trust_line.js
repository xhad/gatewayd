var RippleRestClient = require('ripple-rest-client');
var config = require(__dirname+'/../../config/environment.js');

/**
 * @requires trust, config
 * @function setTrustLine
 * @description Sets trust line between the cold wallet and the hot wallet.
 * @param {String} currency
 * @param {Number} amount
 * @param {Callback} callback
 */

function setTrustLine(currency, amount, callback) {

  var rippleRestClient = new RippleRestClient({
    api: config.get('RIPPLE_REST_API'),
    account: config.get('HOT_WALLET').address
  });

  var options = {
    account: config.get('HOT_WALLET').address,
    secret: config.get('HOT_WALLET').secret,
    limit: amount,
    currency: currency,
    counterparty: config.get('COLD_WALLET')
  };

  rippleRestClient.setTrustLines(options, callback);

}

module.exports = setTrustLine;

