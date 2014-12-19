var validator     = require(__dirname+'/../validator');
var Promise       = require('bluebird');
var getHotWallet  = require('./get_hot_wallet');
var rippleLib     = require('ripple-lib');
var Wallet        = require('ripple-wallet-generator')({ sjcl: rippleLib.sjcl });

/**
 * @function setHotWallet
 *
 * @required api.getHotWallet
 * @description Stores hot wallet address and secret in the config.json file
 * and stores in the rippleAddress table.
 *
 * @param {String} address
 * @param {String} secret
 * @param {callback} fn
 */

function setHotWallet(options) {
  var address = options.address;
  var secret = options.secret;
  return new Promise(function(resolve, reject) {
    if (!validator.isRippleAddress(address)){
      return reject(new Error('invalid ripple address'));
    } 
    var wallet = new Wallet(secret);
    if (wallet.getAddress().value !== address) {
      return reject(new Error('invalid ripple secret'));
    }
    getHotWallet().then(function(hotWallet) {
      return hotWallet.updateAttributes({
        address: address,
        secret: secret    
      });
    })
    .then(resolve)
    .error(reject);
  });
}

module.exports = setHotWallet;

