var request = require('request');
var nconf = require('../config/nconf');
var cold_wallet_address = nconf.get('gateway_cold_wallet');
var hot_wallet = nconf.get('gateway_hot_wallet');
var api = nconf.get('RIPPLE_REST_API'); 
var uuid = require('node-uuid');

var recipient = 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6';

console.log('cold wallet', cold_wallet_address);
console.log('hot wallet', hot_wallet.address);
console.log('rest api', api);

function send(recipient, amount, currency, issuer){

  currency = currency.toUpperCase();

  if ((currency != 'XRP') && !issuer) {
    issuer = cold_wallet_address;  
  }

  var payment = {
    source_account: hot_wallet.address,
    destination_account: recipient,
    destination_amount: {
      value: amount,
      currency: currency,
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

  console.log(params);

  var url = api + '/v1/payments';

  request.post(url, options, function(err,_,body){
    console.log(err, body); 
  });
}

send(recipient, 1, 'xrp');

