var request = require('request');
var assert = require('assert');

var payment = {
  src_address: 'rHKueQebtVU9cEamhBbMV8AEViqKjXcBcB',
  dst_address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
  dst_amount: {
    currency: 'MXN',
    value: '0.10',
    issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
  },
  secret: 'sha6eAz46AziUNVnAYWx3Rp5xReP1'
};

var params = {
  url: 'http://localhost:5990/api/v1/addresses/rHKueQebtVU9cEamhBbMV8AEViqKjXcBcB/payments',
  form: payment,
  json: true
};

describe('making a payment', function(){
  it('should succeed', function(done){
    request.post(params, function(e,r,body){
      console.log(body);
      assert(body.success);
      done();
    });
  });
});

