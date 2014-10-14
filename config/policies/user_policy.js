const Promise = require('bluebird');
const ExternalAccount = require(__dirname+'/../../lib/data/models/external_accounts.js');
const RippleAddress = require(__dirname+'/../../lib/data/models/ripple_addresses.js');

function lookupRippleAddressDestination(deposit) {
  return new Promise(function(resolve, reject) {
    ExternalAccount.find(payment.external_account_id)
    .then(function(externalAccount) {
      var userId = externalAccount.user_id;
      if (userId) {
        return RippleAddress.find({ where: { user_id: userId }})
          .then(function(rippleAddress) {
            resolve(rippleAddress);
          })
      } else {
        reject();
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

