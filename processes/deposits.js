/************************************************/
/*                    ATTENTION                 */ 
/*************************************************

  This process is designed to be customized.

  The `DepositProcessor` class exposes a simple
  framework for converting deposits into outgoing
  ripple payments according to business rules.

  To override the default business rules for the 
  processing of a deposit, pass a custom middleware
  function to the constructor of DepositProcessor.

  Your middlware function will be called by the
  framework when a pending deposit is in the queue,
  and it is also provided a callback function hook.

  The callback function of your middleware accepts
  an error and a payment object with three
  fields in order to enqueue an outgoing payment.

  - ripple_address_id (integer)
  - amount (decimal)
  - currency (string)

/************************************************/

var DepositProcessor = require(__dirname+'/../lib/queues/deposit_processor.js');
var gateway = require(__dirname+'/../');

var depositMiddleware;

var FEE = gateway.config.get('DEPOSIT_FEE');

var middlewarePath = process.env.DEPOSIT_MIDDLEWARE;

if (middlewarePath) {

  depositMiddleware = require(middlewarePath);

} else {

  depositMiddleware = function(deposit, fn) {

    var amount = deposit.amount * (1 - FEE);

    fn(null, {
      to_address_id: deposit.to_address_id,
      amount: amount,
      currency: deposit.currency
    });

  };

}

depositProcessor = new DepositProcessor(depositMiddleware);

depositProcessor.start();

console.log('Processing deposits from the inbound asset deposit queue.')

