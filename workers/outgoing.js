var api = require('ripple-gateway-data-sequelize-adapter');
var send = require("../test/make_payment");
var nconf = require("../config/nconf");

process.env.DATABASE_URL = nconf.get('DATABASE_URL');

function workJob() {

  api.rippleTransactions.readAll({ transaction_state: "queued" }, function(err, transactions) {
    if (!err) {
      var transaction = transactions[0];
      if (transaction) {
        api.rippleAddresses.read(transaction.to_address_id, function(err, address) {
          console.log(address.address, transaction.to_currency + transaction.to_issuer)
          send(address.address, transaction.to_amount, transaction.to_currency, null, function(err, resp){
            if (err) { setTimeout(workJob, 500); return }
            var payment = JSON.parse(resp);
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
      } else {
        setTimeout(workJob, 500);
      }
    } else {
      setTimeout(workJob, 500);
    }
  });

}

workJob();
