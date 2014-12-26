var config = require(__dirname+'/../../config/environment.js');
var data = require(__dirname+'/../data/');

/**
 * @function setHotWallet
 *
 * @required config, data
 * @description Stores hot wallet address and secret in the config.json file
 * and stores in the rippleAddress table.
 *
 * @param {String} address
 * @param {String} secret
 * @param {callback} fn
 */

function setHotWallet(address, secret, fn) {
  var rippleAddress = address;

  function saveHotWallet(address) {
    var key = 'HOT_WALLET';
    config.set(key, {
      address: address.address,
      secret: secret,
      id: address.id
    });
    config.save(function (){
      var hot_wallet = config.get(key);
      fn(null, hot_wallet);
    });
  }
  data.models.rippleAddresses.findOrCreate({
    address: rippleAddress,
    type: 'hot',
    managed: true
  })
  .then(function(address) {
    saveHotWallet(address);
  })
  .error(fn);
}

module.exports = setHotWallet;

