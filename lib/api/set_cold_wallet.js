var config = require(__dirname+'/../../config/config.js');

/**
 * @function setColdWallet
 * @required config
 * @description Stores cold wallet address in the config.json file.
 *
 * @param {String} address
 * @param {callback} fn
 */
function setColdWallet(address, fn){
  var key = 'COLD_WALLET';
  var cold_wallet = config.get(key);
  if (cold_wallet) {
    fn('cold wallet address already set: '+ cold_wallet, null);
  } else {
    config.set(key, address);
    config.save(function(){
      cold_wallet = config.get(key);
      fn(null, cold_wallet);
    });
  }
}

module.exports = setColdWallet;

