assert = require('assert')
Ripple = require('../../lib/ripple')

describe('external transactions', function() {
  before(function(){
    client = new Ripple.Gateway.Client({
      api: 'http://localhost:3000',
      clientId: 'adminUsername',  
      clientSecret: 'somethingSuperSecretAndRandom'
    })
  })

  it('creates an external transaction', function(done){
    client.createExternalTransaction({ 
      deposit: 'true',
      currency: 'XAU',
      cash_amount: '101',
      external_account_id: '3',
      user_id: '2'
    }, function(err, transaction){
      console.log(err);
      console.log(transaction);
      assert.equal(transaction.deposit) 
      done()
    })
  })

})
