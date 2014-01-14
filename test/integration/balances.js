assert = require('assert')
Ripple = require('../../lib/ripple')

describe('withdrawing to ripple', function() {
  before(function(){
    client = new Ripple.Gateway.Client({
      api: 'http://localhost:3000',
      clientId: 'adminUsername',  
      clientSecret: 'somethingSuperSecretAndRandom'
    })
  })
  it('create a valid transaction record', function(done){
    client.getBalances({
      gatewayAccountId: 'someGatewayAccountId'
    }, function(err, rippleTransaction){
      assert.equal(rippleTransaction.txState, 'created') 
      done()
    })
  })
})
