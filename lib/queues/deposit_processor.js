var gateway = require(__dirname+'/../../');

function processQueuedDeposit(middleware, fn) {

  gateway.api.listQueuedDeposits(function(err, deposits) {

    if (err || !deposits) {
      setTimeout(function() {
        processQueuedDeposit(middleware, processQueuedDeposit);
      }, 1000);
    } else {
      var deposit = deposits[0];
      if (deposit) {
        gateway.data.externalAccounts.read({ id: deposit.external_account_id }, function(err, account) {
          if (err) { 
            fn(err, null); 
            return; 
          };
          gateway.data.rippleAddresses.read({ user_id: account.user_id, type: 'independent' }, function(err, address){
            if (err){
              fn(err, null);
              return;
            }
            if (address) {
              deposit.to_address_id = address.id;
            }
            middleware(deposit, function(err, paymentToEnqueue) {
              gateway.data.models.rippleTransactions.create({
                to_amount: paymentToEnqueue.amount,
                to_currency: paymentToEnqueue.currency,
                to_issuer: gateway.config.get('COLD_WALLET'),
                from_amount: paymentToEnqueue.amount,
                from_currency: paymentToEnqueue.currency,
                from_issuer: gateway.config.get('COLD_WALLET'),
                to_address_id: paymentToEnqueue.to_address_id,
                from_address_id: gateway.config.get('HOT_WALLET').id,
                state: 'outgoing',
                external_transaction_id: deposit.id
              }).complete(function(err, payment) {;
                if (err) {
                  processQueuedDeposit(middleware, processQueuedDeposit);
                } else if (payment){
                  var opts = {
                    id: deposit.id,
                    ripple_transaction_id: payment.id
                  };
                  gateway.api.finalizeDeposit(opts, function(err, deposit) {
                    processQueuedDeposit(middleware, processQueuedDeposit);
                  });
                } else {
                  processQueuedDeposit(middleware, processQueuedDeposit);
                }
              });
            });
          });
        });
      } else {
        setTimeout(function() {
          processQueuedDeposit(middleware, processQueuedDeposit);
        }, 1000);
      }
    };
  });
};

function DepositProcessor(middleware) {
  if (typeof middleware == 'function') {
    this.middleware = middleware;  
  } else {
    this.middleware = function(deposit, fn) {
      fn(null, {
        to_address_id: deposit.to_address_id,
        amount: deposit.amount,
        currency: deposit.currency
      });
    };
  };
};

DepositProcessor.prototype.start = function() {
  processQueuedDeposit(this.middleware, processQueuedDeposit);
};

module.exports = DepositProcessor;

