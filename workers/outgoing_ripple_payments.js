var RippleTransaction = require('../app/models/ripple_transaction');
var RippleAddress = require('../app/models/ripple_address');
var request = require('request');
var hotWallet = null;

function popCreatedRippleTransaction() {
  RippleTransaction.find({ where: [
    "transaction_state IS NULL"
  ]}).complete(function(err, transaction){
    if (transaction) {
      var payment = {
        src_address: hotWallet.address,
        dst_address: transaction.to_address,
        dst_amount: {
          currency: transaction.to_currency,
          value: transaction.to_amount,
          issuer: transaction.to_issuer
        },
        secret: hotWallet.secret
      };

      var params = {
        url: 'http://localhost:5990/api/v1/addresses/'+hotWallet.address+'/payments',
        form: payment,
        json: true
      };

      request.post(params, function(err,resp,body){
        if (body.success) {
          console.log("success", body);
          transaction.transaction_state = 'submitted';
          transaction.transaction_hash = body.confirmation_token;
        } else {
          transaction.transaction_state = body.error;
        }
        transaction.save().complete(function(err, transaction){
          console.log('saved');
          console.log(transaction);
          setTimeout(popCreatedRippleTransaction, 1000);
        });
      });
    } else {
      console.log('no new transactions to send out');
      setTimeout(popCreatedRippleTransaction, 1000);
    }
  });
}

function getHotWallet(fn) {
  RippleAddress.find({ where: { type: 'hot' }}).complete(fn);
}

getHotWallet(function(err, wallet) {
  console.log('got the hot wallet', wallet.secret);
  hotWallet = wallet;
  popCreatedRippleTransaction();
});

