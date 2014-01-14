assert = require('assert')
Ripple = require('../../lib/ripple')

describe('depositing from ripple', function() {
  before(function(){
    client = new Ripple.Gateway.Client({
      api: 'http://localhost:3000',
      clientId: 'adminUsername',  
      clientSecret: 'somethingSuperSecretAndRandom'
    })
  })
  it('create a valid transaction record', function(done){
    client.createRippleDeposit({ 
      toCurrency: 'XAG',
      toAmount: '10',
      toIssuer: 'someIssurRippleAddress',
      toAddress: 'theGatewaysRippleAddress',
      fromAddress: 'someRippleAddress',
      txState: 'tesSUCCESS',
      txHash: 'someTransactionHash'
    }, function(err, rippleDeposit){
      console.log(err)
      console.log(rippleDeposit)
      assert.equal(rippleDeposit.txState, 'tesSUCCESS') 
      done()
    })
  })
})
