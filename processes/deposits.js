var queue = require('../lib/deposit_queue.js');

var config = require('../config/nconf.js');
var api = require("ripple-gateway-data-sequelize-adapter");
var sql = require('../node_modules/ripple-gateway-data-sequelize-adapter/lib/sequelize.js');
var gateway = require('../lib/gateway.js');

queue.on('deposit', function(deposit) {

  sql.transaction(function(t) {

    api.externalAccounts.read({ id: externalAccountId }, function(err, account) {
      if (err) { fn(err, null); return; };

      api.rippleAddresses.read({ user_id: account.user_id }, function(err, addresses){
        if (err && addresses[0]) {

          tx.rollback();
          return;
        }

        var address = addresses[0];

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
});

queue.work();

console.log('Processing deposits from the inbound asset deposit queue.');

