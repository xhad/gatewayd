var features = require(__dirname+'/../features');

if (features.isEnabled('bridge-payments')) {

  var Promise       = require('bluebird');
  var data          = require(__dirname+'/../data');
  var getColdWallet = require(__dirname+'/../api/get_cold_wallet');
  var protocol      = require(__dirname+'/');

  var BridgePayment = function() {};

  BridgePayment.commit = function(options) {
    return new Promise(function(resolve, reject) {
      if(!options.direction) {
        return reject(new Error('direction must be either to-ripple or from-ripple'));
      }
      if (options.direction === 'from-ripple') {
        if (!options.external) {
          return reject(new Error('ripple and external options must be provided'));
        } 
        protocol.external.outbound.quote(options.external).then(function(quote) {
            getColdWallet(function(error, address) {
              data.models.externalAccounts.findOrCreate({
                address: options.external.address,
                type: 'bitcoin'
              })
              .then(function() {
                var rippleUri = 'send?to='+address.address+(address.tag ? ('&dt='+address.tag) : '')+'&amount='+quote.amount+'/'+quote.currency;
                resolve({
                  direction: options.direction,
                  external: quote,
                  ripple: {
                    uri: 'ripple://'+rippleUri,
                    url: 'https://rippletrade.com/#/'+rippleUri,
                    amount: quote.amount,
                    currency: quote.currency,
                    address: address.address+(address.tag ? ('?dt='+address.tag) : '')
                  }
                });
              })
              .error(reject);
            });
        })
        .error(reject);
      }
    });
  };

  module.exports = BridgePayment;
}

