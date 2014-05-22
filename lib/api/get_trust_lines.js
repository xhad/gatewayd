var config = require(__dirname+'/../../config/config.js');
var ripple = require(__dirname+'/../ripple/');

/**@requires config, ripple
 * @function getTrustLines
 *
 * @description Gets trust line between the hot an cold wallet
 * @param {callback} fn - handles trust line data and is passed to  ripple.getTrustLines(opts, fn);
 */
function getTrustLines(fn){
  var hotWallet = config.get('HOT_WALLET').address;
  var coldWallet = config.get('COLD_WALLET');
  var opts = {
    fromAccount: hotWallet,
    toAccount: coldWallet 
  };
  ripple.getTrustLines(opts, fn);
}

module.exports = getTrustLines;

