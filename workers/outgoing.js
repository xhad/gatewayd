var request = require('request');
var nconf = require('../config/nconf.js');
var rippleRest = nconf.get('RIPPLE_REST_API');

function popCreatedRippleTransaction() {

  adapter.getQueuedRippleTransactions(function(err, transactions) {
    if (!err) {
      for (transaction in transactions) {
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
      }
      if (transaction) {
        var params = {
          url: rippleRest+'/api/v1/addresses/'+hotWallet.address+'/payments',
          form: payment,
          json: true
        };

        request.post(params, function(err,resp,body){
          adapter.updateRippleTransaction({ id: transaction.id }, {
            transaction_state: 'submitted',
            transaction_hash: body.confirmation_token
          }, function(err, transaction) {
            setTimeout(popCreatedRippleTransaction, 1000);
          });
        });
      } else {
        setTimeout(popCreatedRippleTransaction, 1000);
      }
    }
  });
  });
}

function getHotWallet(fn) {
  adapter.getHotWallet(fn);
}

getHotWallet(function(err, wallet) {
  hotWallet = wallet;
  popCreatedRippleTransaction();
});

