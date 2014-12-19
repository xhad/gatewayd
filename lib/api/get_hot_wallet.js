var generateWallet = require(__dirname+'/generate_wallet');
const RippleAddress = require(__dirname+'/../data/').models.rippleAddresses;
var Promise = require('bluebird');

module.exports = function() {
  return new Promise(function(resolve, reject) {
    RippleAddress.find({ where: { type: 'hot' }})
      .then(function(address) {
        if (!address) {
          generateWallet(function(error, wallet) {
            if (error) { return reject(error); }
            RippleAddress.create({
              address: wallet.address,
              secret: wallet.secret,
              type: 'hot',
              managed: true
            })
            .then(resolve)
            .error(reject);
          });
        }
        resolve(address);
      })
      .error(reject);
  });
};

