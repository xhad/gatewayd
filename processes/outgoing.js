var gateway = require(__dirname + '/../');
var sendPayment = require(__dirname + "/../lib//ripple/send_payment");
var buildPayment = require(__dirname + '/../lib/ripple/build_payment');
var getPaymentStatus = require(__dirname + '/../lib/ripple/get_payment_status');

var middleware;

process.env.DATABASE_URL = gateway.config.get('DATABASE_URL');

var middlewarePath = process.env.PAYMENT_SENT_MIDDLEWARE;
if (middlewarePath) {
  middleware = require(middlewarePath);
} else {
  middleware = function(payment){
    console.log('payment sent');
    console.log(payment.to_amount, payment.to_currency);
  };
};

function loop(){
  setTimeout(function(){
    popOutgoingPayment(popOutgoingPayment);
  }, 1000);
}

function processOutgoingPayment(transaction, address, fn){

  buildPayment(transaction, address, function(err, payment) {
    if (err) { handleError(err, fn); return; }
    sendPayment(payment, function(err, resp){
      if (err || !resp.success) {
        handleError(err, fn);
      } else {
        fn(null, resp);
      }
    });
  });

  function handleError(err, fn) {
    if (err.match('No paths found')){
      fn('noPathFound', null);
    } else {
      fn('retry', null);
    }
  }
}

function popOutgoingPayment(callback) {
  gateway.api.listOutgoingPayments(function(err, transactions) {
    if (!err) {
      var transaction = transactions[0];
      if (transaction) {
        gateway.data.rippleAddresses.read(transaction.to_address_id, function(err, address) {
          processOutgoingPayment(transaction, address, function(err, resp){
            if (err) {
              switch(err)
              {
                case 'retry':
                  transaction.state = 'outgoing';
                  break;
                case 'noPathFound':
                  transaction.state = 'failed';
                  break;
                default:
                  transaction.state = 'failed';
              }
            } else {
              var statusUrl = resp.status_url
              transaction.state = 'sent';
              transaction.uid = resp.client_resource_id;

              middleware(transaction);
              getPaymentStatus(statusUrl, function(err, resp){
                if(err){
                  console.log('Error:getPaymentStatus::', err);
                } else {
                  transaction.transaction_state = resp.result;
                  transaction.save().complete(function(){
                    console.log(transaction.transaction_state);
                    loop();
                  });
                }
              })
            }

            transaction.save().complete(function(){
              console.log(transaction.state);
              loop();
            });
          });
        });
      } else {
        loop();
      }
    } else {
      loop();
    }
  });
}

loop();

console.log('Sending outgoing ripple payments from the queue to Ripple REST.');

