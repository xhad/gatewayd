var request = require('request');
var gateway = require(__dirname +'/../../');

var restApiUrl = gateway.config.get('RIPPLE_REST_API'); 
var uuid = require('node-uuid');

function send(payment, fn){
  if (payment) {
    payment.partial_payment = null;
    payment.no_direct_ripple = null;

    var params = {
      payment: payment,
      client_resource_id: uuid.v4(),
      secret: gateway.config.get('gateway_hot_wallet').secret
    };

    var options = {
      form: params,
      rejectUnauthorized: false,
      json: true
    };

    var url = restApiUrl + 'v1/payments';

    request.post(url, options, function(err,_,resp){
      fn(err, resp); 
    });
  } else {
    fn('no payment', null);
  }
}

module.exports = send;

