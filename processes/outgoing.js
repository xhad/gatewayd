
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

function processOutgoingPayment(callback) {

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
              console.log(err);
              if (err == 'No paths found') {
                transaction.transaction_state = 'no_path_found';
                setTimeout(function(){ 
                  processOutgoingPayment(processOutgoingPayment);
                }, 1000);
              } else {
                setTimeout(function(){ 
                  processOutgoingPayment(processOutgoingPayment);
                }, 1000);
              }
            } else {
              send(payment, function(err, payment){
                if (err) { 
                  setTimeout(function(){ 
                    processOutgoingPayment(processOutgoingPayment);
                  }, 1000);
                } else {

                  if (payment.success) {
                    transaction.transaction_state = 'sent';
                    transaction.save().complete(function(){
                      console.log(transaction);
                      client.confirmPayment(payment.client_resource_id, function(err, payment){
                            console.log(err, payment);
                            if(err){
                              console.log('error:', err);
                              setTimeout(function(){ 
                                processOutgoingPayment(processOutgoingPayment);
                              }, 1000);
                            } else {
                              transaction.transaction_hash = payment.hash;
                              transaction.save();
                              setTimeout(function(){ 
                                processOutgoingPayment(processOutgoingPayment);
                              }, 1000);
                            }

                        });
                    });
                  } else {
                    setTimeout(function(){ 
                      processOutgoingPayment(processOutgoingPayment);
                    }, 1000);
                  }
                }
              });
            }
          });
        });
      } else {
        setTimeout(function(){ 
          processOutgoingPayment(processOutgoingPayment);
        }, 1000);
      }
    } else {
      setTimeout(function(){ 
        processOutgoingPayment(processOutgoingPayment);
      }, 1000);
    }
  });

}

processOutgoingPayment(processOutgoingPayment);

console.log('Sending outgoing ripple payments from the queue to Ripple REST.');


