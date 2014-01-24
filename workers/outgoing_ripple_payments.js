var RippleTransaction = require('../app/models/ripple_transaction');

function popCreatedRippleTransaction() {
  RippleTransaction.find({ where: { transaction_state: 'created' }}).complete(function(err, transaction){
    if (transaction) {
      console.log('found a new transaction to send out');
      console.log('go ahead and send it!');
    } else {
      console.log('no new transactions to send out');
    }
    setTimeout(popCreatedRippleTransaction, 1000);
  });
}

popCreatedRippleTransaction();



