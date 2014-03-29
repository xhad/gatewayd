var api = require('ripple-gateway-data-sequelize-adapter');
var send = require("../lib/send_payment");
var nconf = require("../config/nconf");
var build_payment = require('../lib/build_payment');
var gateway = require('../lib/gateway');

process.env.DATABASE_URL = nconf.get('DATABASE_URL');

function workJob() {

  gateway.payments.listOutgoing(function(err, transactions) {
    if (!err) {
      var transaction = transactions[0];
      if (transaction) {
        api.rippleAddresses.read(transaction.to_address_id, function(err, address) {
          var address = address.address,
              amount = transaction.to_amount,
              currency = transaction.to_currency;

          build_payment(address, amount, currency, function(err, payment) {

            if (err) { 
              transaction.transaction_state = 'error';
              transaction.save().complete(function(){
                setTimeout(workJob, 500);
              });
              return;
            }
            send(payment, function(err, payment){

              if (err) { setTimeout(workJob, 500); return }

              if (payment.success) {
                transaction.transaction_state = 'sent';
                transaction.save().complete(function(){
                  setTimeout(workJob, 500);
                });
              } else {
                setTimeout(workJob, 500);
              }
            });
          });          
        });
      } else {
        setTimeout(workJob, 500);
      }
    } else {
      setTimeout(workJob, 500);
    }
  });

}

workJob();

console.log('Sending outgoing ripple payments from the queue to Ripple REST.');

