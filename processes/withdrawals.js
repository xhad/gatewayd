var gateway = require(__dirname+'/../');

var queue = require(__dirname+'/../lib/queues/withdrawal_processor.js');
var sql = require(__dirname+'/../node_modules/ripple-gateway-data-sequelize/lib/sequelize.js');

queue.on('payment:withdrawal', function(payment) {

  console.log('received a new payment event');
  console.log(payment.toJSON());
  
  gateway.data.rippleAddresses.read(payment.from_address_id, function(err, address) {
    
    if (err || !address) {
      console.log('no address found');
      return;
    }

    console.log(address);
      
    sql.transaction(function(t) {

      gateway.data.externalTransactions.create({
        deposit: false,
        amount: payment.to_amount * 0.99,
        currency: payment.to_currency,
        status: 'pending',
        ripple_transaction_id: payment.id,
        external_account_id: address.tag
      }, function(err, withdrawal) {

        console.log(err, withdrawal);
        
        if (err) {
          t.rollback();
          return;
        } 
        
        gateway.data.rippleTransactions.update({
          id: payment.id,
          transaction_state: 'tesSUCCESS'
        }, function(err, rippleTransaction) {

          if (err) {
            t.rollback();
            return;
          } else {
            if (rippleTransaction.transaction_state == 'incoming') {
              t.rollback();
              return;
            } 
            t.commit();
            console.log('commit!');
          }

        })
      });
    });
  });
});

queue.work();

console.log('Processing withdrawals from the inbound ripple payment queue.');

