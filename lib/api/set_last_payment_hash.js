var Promise       = require('bluebird');
var getColdWallet = require(__dirname+'/get_cold_wallet.js');

module.exports = function(hash){
  return new Promise(function(resolve, reject) {
    getColdWallet(function(error, address) {
      if (error) {
        return reject(error);
      }

      if (!hash) {
        return reject(new Error('HashNotFound'));
      }

      address.setLastPaymentHash(hash).then(function(record){
        var newHash = JSON.parse(record.dataValues.data);
        resolve(newHash.lastPaymentHash);
      }).error(reject);
    });
  });
};

