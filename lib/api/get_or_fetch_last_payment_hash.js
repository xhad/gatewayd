var Promise       = require('bluebird');
var getColdWallet = require(__dirname+'/get_cold_wallet.js');

module.exports = function (){
  return new Promise(function(resolve, reject) {
    getColdWallet(function(error, address) {
      if (error) {
        return reject(error);
      }

      var lastPaymentHash = address.getLastPaymentHash();

      if (!lastPaymentHash) {
        address.fetchLastPaymentHash()
          .then(function(hash) {
            return address.setLastPaymentHash(hash);
          }).then(function(record){
              var newHash = JSON.parse(record.dataValues.data);
              resolve(newHash.lastPaymentHash);
          }).catch(function(error){
            if (error){
              reject(error);
            }
          });
      } else {
        resolve(lastPaymentHash);
      }
    });
  });
};
