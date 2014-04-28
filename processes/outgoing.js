var gateway = require(__dirname + '/../');
var send = require(__dirname + "/../lib//ripple/send_payment");
var build_payment = require(__dirname + '/../lib/ripple/build_payment');

process.env.DATABASE_URL = gateway.config.get('DATABASE_URL');

var middleware;
var middlewarePath = process.env.PAYMENT_SENT_MIDDLEWARE;

if (middlewarePath) {

  middleware = require(middlewarePath);

} else {

  middleware = function(payment, fn){

    console.log('payment sent');
    console.log(payment.to_amount, payment.to_currency);
    fn();

  };

};

function processOutgoingPayment(callback) {

  gateway.api.listOutgoingPayments(function(err, transactions) {
    if (!err) {
      var transaction = transactions[0];
      if (transaction) {
        gateway.data.rippleAddresses.read(transaction.to_address_id, function(err, address) {
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

                      middleware(payment, function() {

                        console.log(transaction);
                        setTimeout(function(){ 
                          processOutgoingPayment(processOutgoingPayment);
                        }, 1000);
                      
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

setTimeout(function(){


  processOutgoingPayment(processOutgoingPayment);

}, 2000);

console.log('Sending outgoing ripple payments from the queue to Ripple REST.');

