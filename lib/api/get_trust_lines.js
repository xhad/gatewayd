var config = require(__dirname+'/../../config/config.js');
var ripple = require(__dirname+'/../ripple/');

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

