var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');
var logger = require('winston');

/**
* Retry Failed Payment
*
* @param rippleTransactionId Integer
* @returns {RippleTransaction}
*/

function retryFailedPayment(rippleTransactionId) {
  logger.info('in retry failed payment');
  gateway.api.retryFailedPayment(rippleTransactionId, function(err, transaction){
    logger.info('called retry failed payment api call.');
    if (err) {
      logger.error(err);
    } else {
      PrettyPrintTable.payments([transaction]);
    }
  });
}

module.exports = retryFailedPayment;
