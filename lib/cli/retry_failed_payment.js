var gateway = require(__dirname+'/../../')
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* Retry Failed Payment
*
* @param rippleTransactionId Integer
* @returns {RippleTransaction}
*/

function retryFailedPayment(rippleTransactionId) {
  console.log('in retry failed payment');
  gateway.api.retryFailedPayment(rippleTransactionId, function(err, transaction){
    console.log('called retry failed payment api call.');
    if (err) {
      console.log('error:', err);
    } else {
      PrettyPrintTable.payments([transaction]);
    }
  });
}

module.exports = retryFailedPayment;
