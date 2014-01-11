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
  it('should require params for a valid ripple transaction record', function(fn){
    client.createRippleTransaction({ 
      toCurrency: 'XAG',
      fromCurrency: 'XAG',
      toAmount: '10',
      fromAmount: '10.01', 
      toIssuer: 'someIssurRippleAddress',
      fromIssuer: 'someIssurRippleAddress',
      sendTag: '10',
      issuance: true
    }, function(err, res){
      response = JSON.parse(res)
      assert(response.success)
      assert.equal(response.rippleTransaction.txState, 'created') 
      fn()
    })
  })
})
