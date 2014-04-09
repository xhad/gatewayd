var DepositProcessor = require('../lib/deposit_processor.js');

depositProcessor = new DepositProcessor(function(deposit, enqueueOutgoingPayment) {

  // 2% Fee for Gateway Deposits, for instance
  var amount = deposit.amount * 0.98;
  
  enqueueOutgoingPayment(null, {
    to_address_id: deposit.to_address_id,
    amount: amount,
    currency: deposit.currency
  });
  
});

depositProcessor.start();

