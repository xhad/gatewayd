var config = require(__dirname+'/../../config/environment.js');
var RippleRestClient = require('ripple-rest-client');

/**@requires config, ripple
 * @function getTrustLines
 *
 * @description Gets trust line between the hot an cold wallet
 * @param {callback} fn - handles trust line data and is passed to  rippleRestClient.getTrustLines(opts, fn);
 */
function getTrustLines(options, fn){
  var hotWallet = config.get('HOT_WALLET').address;
  var coldWallet = config.get('COLD_WALLET');

  if (options && options.hotWallet) {
    hotWallet = options.hotWallet;
  }
  if (options && options.coldWallet) {
    hotWallet = options.coldWallet;
  }

  var rippleRestClient = new RippleRestClient({
    api: config.get('RIPPLE_REST_API'),
    account: coldWallet
  });

  var opts = {
    fromAccount: hotWallet,
    toAccount: coldWallet
  };

  rippleRestClient.getTrustLines(opts, fn);

}

module.exports = getTrustLines;

