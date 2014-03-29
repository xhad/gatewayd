var queue = require('../lib/deposit_queue.js');

var config = require('../config/nconf.js');
var abstract = require('../lib/abstract.js');
var api = require("ripple-gateway-data-sequelize-adapter");
var sql = require('../node_modules/ripple-gateway-data-sequelize-adapter/lib/sequelize.js');
var gateway = require('../lib/gateway.js');

queue.on('deposit', function(deposit) {

  sql.transaction(function(t) {

    abstract.getExternalAccountRippleAddress(deposit.external_account_id, function(err, address) {
      if (err) {

        tx.rollback();
        return;
      }

      var opts = {
        to_address_id: address.id,
        amount: deposit.amount,
        currency: deposit.currency,
      };

      gateway.payments.enqueueOutgoing(opts, function(err, payment) {
        if (err) {

          t.rollback();
          return;
        }

        if (payment) {
          var opts = {
            id: deposit.id,
            ripple_address_id: payment.id
          };

          gateway.deposits.finalize(opts, function(err, deposit) {
            if (err) {

              t.rollback();
              return;
            }

            t.commit();
            console.log(deposit.toJSON());

          });
        } else {
          t.rollback();
          return;
        };
      });
    });
  });
});


queue.work();

console.log('Pulling deposits from the queue for processing');

