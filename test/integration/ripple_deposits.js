assert = require('assert')
Ripple = require('../../lib/ripple')
crypto = require("crypto")

describe('depositing from ripple', function() {
  before(function(){
    client = new Ripple.Gateway.Client({
      api: 'http://localhost:3000',
      clientId: 'adminUsername',  
      clientSecret: 'somethingSuperSecretAndRandom'
    })
  })
  it('create a valid transaction record', function(done){
    txHash = crypto.randomBytes(32).toString('hex')
    client.createRippleDeposit({ 
      toCurrency: 'XAG',
      toAmount: '10',
      toIssuer: 'someIssurRippleAddress',
      toAddress: 'theGatewaysRippleAddress',
      fromAddress: 'someRippleAddress',
      txState: 'tesSUCCESS',
      txHash: txHash
    }, function(err, rippleDeposit){
      assert.equal(rippleDeposit.txState, 'tesSUCCESS') 
      done()
    })
  })
})
