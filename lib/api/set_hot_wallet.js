var config = require(__dirname+'/../../config/config.js');
var data = require('ripple-gateway-data-sequelize');

function setHotWallet(address, secret, fn) {  
  var rippleAddress = address;

  function saveHotWallet(address) {
    var key = 'HOT_WALLET';
    config.set(key, {
      address: address.address,
      secret: secret,
      id: address.id
    });
    config.save(function(){
      hot_wallet = config.get(key);
      fn(null, hot_wallet);
    });
  }
  data.rippleAddresses.read({ address: rippleAddress }, function(err, address) {
    if (err) {
      data.rippleAddresses.create({
        type: 'hot',
        managed: true,
        address: rippleAddress
      }, function(err, address) {
        saveHotWallet(address); 
      });
    } else {
      saveHotWallet(address); 
    }
  });
}

module.exports = setHotWallet;

