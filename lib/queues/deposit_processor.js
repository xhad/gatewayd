var gateway = require(__dirname+'/../../');
var sql = require(__dirname+'/../../node_modules/ripple-gateway-data-sequelize/lib/sequelize.js');

/**
* Add a payment to the outgoing queue
*
* @param {string} currency
* @param {decimal} amount
* @param {integer} ripple_address_id
* @param {function(err, deposit)} callback
* @returns [Payment]
*/
function enqueueOutgoingPayment(opts, fn) {

  gateway.data.models.rippleTransactions.create({
    to_amount: opts.amount,
    to_currency: opts.currency,
    to_issuer: gateway.config.get('COLD_WALLET'),
    from_amount: opts.amount,
    from_currency: opts.currency,
    from_issuer: gateway.config.get('COLD_WALLET'),
    to_address_id: opts.to_address_id,
    from_address_id: gateway.config.get('HOT_WALLET').id,
    state: 'outgoing'
  }).complete(fn);
}

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
              sql.transaction(function(sqlTransaction) {
                enqueueOutgoingPayment(paymentToEnqueue, function(err, payment) {
                  if (err) {
                    sqlTransaction.rollback();
                    processQueuedDeposit(middleware, processQueuedDeposit); 
                  } else if (payment){
                    var opts = {
                      id: deposit.id,
                      ripple_transaction_id: payment.id
                    };
                    gateway.api.finalizeDeposit(opts, function(err, deposit) {
                      if (err) {
                        sqlTransaction.rollback();
                      } else {
                        sqlTransaction.commit();
                      }
                      processQueuedDeposit(middleware, processQueuedDeposit); 
                      console.log(deposit);
                    });
                  } else {
                    sqlTransaction.rollback();
                    processQueuedDeposit(middleware, processQueuedDeposit); 
                  };
                });
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

