var request = require('request');
var nconf = require('../config/nconf');
var cold_wallet_address = nconf.get('gateway_cold_wallet');
var hot_wallet = nconf.get('gateway_hot_wallet');
var api = nconf.get('RIPPLE_REST_API'); 
var uuid = require('node-uuid');

function send(recipient, amount, currency, issuer, fn){

  currency = currency.toUpperCase();

  if ((currency != 'XRP') && !issuer) {
    issuer = cold_wallet_address;  
  }

  var payment = {
    source_account: hot_wallet.address,
    destination_account: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',//recipient,
    destination_amount: {
      value: amount,
      currency: currency,
      issuer: issuer
    }
  };

  if (issuer) {
    payment.destination_amount.issuer = issuer;
  }

  var params = {
    payment: payment,
    client_resource_id: uuid.v4(),
    secret: hot_wallet.secret
  };

  var options = {
    form: params,
    rejectUnauthorized: false
  };

  var url = api + '/v1/payments';

  console.log(url, options);
  console.log(params.payment.destination_amount);
  request.post(url, options, function(err,_,body){
    fn(err, body); 
  });
}

module.exports = send;

