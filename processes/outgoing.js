var api = require('ripple-gateway-data-sequelize-adapter');
var send = require("../lib/send_payment");
var nconf = require("../config/nconf");
var build_payment = require('../lib/build_payment');
var gateway = require('../lib/gateway');
var Client = require('ripple-rest-client');

process.env.DATABASE_URL = nconf.get('DATABASE_URL');

var client = new Client({
    api: nconf.get('RIPPLE_REST_URL'),
    account: nconf.get('gateway_hot_wallet').address,
    secret: ''
});

function timeoutAndLoop() {
  setTimeout(function(){ 
    processOutgoingPayment(processOutgoingPayment);
  }, 1000);
}

function processOutgoingPayment(callback) {

  gateway.payments.listOutgoing(function(err, transactions) {
    if (!err) {
      var transaction = transactions[0];
      if (transaction) {
        api.rippleAddresses.read(transaction.to_address_id, function(err, address) {
          var address = address.address,
              amount = transaction.to_amount,
              currency = transaction.to_currency;

          console.log(address);
          console.log(amount);
          console.log(currency);
          build_payment(address, amount, currency, function(err, payment) {

            if (err) {
              console.log(err);
              if (err == 'No paths found') {
                transaction.transaction_state = 'no_path_found';
                timeoutAndLoop();
                return;
              } else {
                timeoutAndLoop();
                return;
              }
            }
            send(payment, function(err, payment){
                console.log('ERROR', err);
              if (err) { 
                timeoutAndLoop();
                return;

                if (payment.success) {
                  transaction.transaction_state = 'sent';
                  transaction.save().complete(function(){
                    client.confimPayment(payment.client_resource_id, function(err, payment){

                          if(err){
                            console.log('error:', err);
                            timeoutAndLoop();
                            return;
                          } else {
                            transaction.transaction_hash = payment.hash;
                            transaction.save();
                            timeoutAndLoop();
                              return
                          }

                      });
                  });
                } else {
                  timeoutAndLoop();
                  return;
                }
              }
            });
          
          });
        });
      } else {
        timeoutAndLoop();
      }
    } else {
      timeoutAndLoop();
    }
  });

}

processOutgoingPayment(processOutgoingPayment);

console.log('Sending outgoing ripple payments from the queue to Ripple REST.');

