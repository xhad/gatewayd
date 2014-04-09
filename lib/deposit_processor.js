var gateway = require('../');
var sql = require('../node_modules/ripple-gateway-data-sequelize-adapter/lib/sequelize.js');

function processQueuedDeposit(middleware, fn) {

  gateway.deposits.listQueued(function(err, deposits) {

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

          gateway.data.rippleAddresses.read({ user_id: account.user_id }, function(err, address){

            if (err){

              fn(err, null);
              return;
            }


            if (address) {
              deposit.to_address_id = address.id;
            }

            middleware(deposit, function(err, paymentToEnqueue) {

              sql.transaction(function(sqlTransaction) {

                gateway.payments.enqueueOutgoing(paymentToEnqueue, function(err, payment) {

                  if (err) {

                    sqlTransaction.rollback();
                    processQueuedDeposit(middleware, processQueuedDeposit); 

                  } else if (payment){

                    var opts = {
                      id: deposit.id,
                      ripple_transaction_id: payment.id
                    };

                    gateway.deposits.finalize(opts, function(err, deposit) {
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
        currency: deposit.currency,
      });

    };

  };
  
};

DepositProcessor.prototype.start = function() {

  processQueuedDeposit(this.middleware, processQueuedDeposit);

};

module.exports = DepositProcessor;

