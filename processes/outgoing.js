var api = require('ripple-gateway-data-sequelize-adapter');
var send = require("../lib/send_payment");
var nconf = require("../config/nconf");
var build_payment = require('../lib/build_payment');

process.env.DATABASE_URL = nconf.get('DATABASE_URL');

function workJob() {

  api.rippleTransactions.readAll({ transaction_state: "queued" }, function(err, transactions) {
    if (!err) {
      var transaction = transactions[0];
      if (transaction) {
        api.rippleAddresses.read(transaction.to_address_id, function(err, address) {
          console.log(address.address, transaction.to_currency + transaction.to_issuer)
          build_payment(address.address, transaction.to_amount, transaction.to_currency, function(err, payment) {
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
