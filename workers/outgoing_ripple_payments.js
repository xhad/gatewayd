var RippleTransaction = require('../app/models/ripple_transaction');
var RippleAddress = require('../app/models/ripple_address');
var request = require('request');
var hotWallet = null;
var nconf = require('../config/nconf.js');
var rippleRest = nconf.get('RIPPLE_REST_API');

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
        url: rippleRest+'/api/v1/addresses/'+hotWallet.address+'/payments',
        form: payment,
        json: true
      };

      request.post(params, function(err,resp,body){
        if ((!err) && (body.success)) {
          transaction.transaction_state = 'submitted';
          transaction.transaction_hash = body.confirmation_token;
        } else {
          transaction.transaction_state = body.error;
        }
        transaction.save().complete(function(err, transaction){
          setTimeout(popCreatedRippleTransaction, 1000);
        });
      });
    } else {
      setTimeout(popCreatedRippleTransaction, 1000);
    }
  });
}

function getHotWallet(fn) {
  RippleAddress.find({ where: { type: 'hot' }}).complete(fn);
}

getHotWallet(function(err, wallet) {
  hotWallet = wallet;
  popCreatedRippleTransaction();
});

