const Promise = require('bluebird');
const ExternalAccount = require(__dirname+'/../../lib/data/models/external_accounts.js');
const RippleAddress = require(__dirname+'/../../lib/data/models/ripple_addresses.js');

function lookupRippleAddressDestination(payment) {
  return new Promise(function(resolve, reject) {
    Bridge.find({ where: {
      external_account_id: payment.external_account_id,
      direction: 'to-ripple'
    }})
    .then(function(bridge) {
      if (bridge) {
        RippleAddress.find(bridge.ripple_address_id)
        .then(function(address) {
          if (address) {
            reject('ripple address not found');
          } else {
            resolve(address);
          }
        })
        .error(reject);
      } else {
        reject('bridge not found'); 
      }
    })
    .error(function(error) {
      reject(error);
    })
  });
}

module.exports = {

  doesApply: function(payment) {
    return new Promise(function(resolve, reject) {
      lookupRippleAddressDestination(payment)
        .then(resolve).error(reject);
    });
  },

  apply: function(payment) {
    return new Promise(function(resolve, reject) {
      lookupRippleAddressDestination(payment)
      .then(function(rippleAddress) {
        // create an outgoing ripple payment as pending
        // create a corresponding gateway transaction
        // update the ripple payment to outgoing state
        // update the corresponding gateway transaction to completed
      })
      .error(reject);
    });
  }
}

