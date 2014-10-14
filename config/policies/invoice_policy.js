const Promise = require('bluebird');
const ExternalAccount = require(__dirname+'/../../lib/data/models/external_accounts.js');
const RippleAddress = require(__dirname+'/../../lib/data/models/ripple_addresses.js');

function getGatewayTransaction(externalTransaction) {
  return new Promise(function(resolve, reject) {
    GatewayTransaction.find({ where: {
      external_transaction_id: externalTransaction.id,
      direction: 'to-ripple' 
    }})
    .then(function(gatewayTransaction) {
      if (gatewayTransaction) {
        resolve(gatewayTransaction);
      } else {
        reject('gateway transaction not found');
      }
    }).error(reject);
  });
}
function getRippleTransaction(payment) {
  return getGatewayTransaction(payment).then(function(gatewayTransaction) {
    return RippleTransaction.find(gatewayTransaction.ripple_transaction_id) 
  });
}

module.exports = {

  doesApply: function(payment) {
    return getGatewayTransaction(payment)
  },

  apply: function(payment) {
    return new Promise(function(resolve, reject) {
      getGatewayTransaction(payment).then(function(gatewayTransaction) {
        return getRippleTransaction(payment).then(function(rippleTransaction) {
          return rippleTransaction.updateAttributes({
            state: 'outgoing'
          })
        })
        .then(function() {
          return payment.updateAttributes({
            status: 'complete'
          }) 
        })
        .then(function() {
          return gatewayTransaction.updateAttributes({
            state: 'complete'
          })
        })
      })
      .error(reject);
    });
  }
}

