var Client = require('ripple-rest-client');
var gateway = require(__dirname+'/../../');

var client = new Client({
  api: gateway.config.get('RIPPLE_REST_API'),
  account: gateway.config.get('HOT_WALLET').address,
  secret: gateway.config.get('HOT_WALLET').secret,
});

function buildPayment(transaction, address, fn) {
  var newPayment = {
    currency: transaction.to_currency,
    amount: transaction.to_amount,
    recipient: address.address
  };

  if (!newPayment.currency == 'XRP') {
    newPayment.issuer = gateway.config.get('COLD_WALLET');
  }

  client.buildPayment(newPayment, function(err, resp) {
    
    if (err) { fn(err, null); return };
    if (resp.success) {
      fn(null, resp.payments[0]);  
    } else {
      fn(resp.message, null);
    }
  })
}

module.exports = buildPayment;

