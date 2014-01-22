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
    client.createRippleTransaction({ 
      to_currency: 'XAG',
      from_currency: 'XAG',
      to_amount: '10',
      from_amount: '10.01', 
      to_issuer: 'someIssurRippleAddress',
      from_issuer: 'someIssurRippleAddress',
      to_address: 'someRippleAddress',
      from_address: 'someRippleAddress',
      ripple_address_id: '3',
      send_tag: '10',
      issuance: true
    }, function(err, resp){
      console.log(err);
      console.log(resp);
      assert.equal(resp.ripple_transaction.transaction_state, 'created') 
      done()
    })
  })

})
