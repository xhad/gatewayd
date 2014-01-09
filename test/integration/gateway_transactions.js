helpers = require("./helpers")
assert = require("assert")
async = require("async")
request = require('request')

describe("Getting an account's gateway transactions", function(){
  afterEach(function(){
    console.log(this.currentTest.title)
  })

  before(function(done){
    console.log()
    console.log("Getting an account's gateway transactions")
    console.log("-------------------------------------------------------")
    account = null
    user = null
    helpers.createUserWithAccount(function(resp){
      user = resp.user
      account = resp.account
      done()
    }) 
  })
  
  it('should have no transactions for a new account', function(done){
    request(helpers.baseUrl+'v1/gateway/accounts/'+account.id+'/transactions', function(e,r,b){
      assert.equal(JSON.parse(b).gatewayTransactions.length, 0)
      done()
    })
  })

  it('should have one transaction after creating a deposit', function(done){
    request.post(helpers.baseUrl+'v1/gateway/accounts/'+account.id+'/deposits', {form: {
      currency: 'XAG', cashAmount: 10
    }}, function(err, resp, body) {
      response = JSON.parse(body)
      assert(response.success)
      request(helpers.baseUrl+'v1/gateway/accounts/'+account.id+'/transactions', function(err, resp, body){
        response = JSON.parse(body)
        assert(response.success)
        assert(response.gatewayTransactions.length, 1)
        done()
      }) 
    })
  })

  it('should have two transactions after creating a withdrawal', function(done){
    request.post(helpers.baseUrl+'v1/gateway/accounts/'+account.id+'/withdrawals', {form: {
      currency: 'XAG', cashAmount: 5
    }}, function(err, resp, body) {
      response = JSON.parse(body)
      assert(response.success)
      request(helpers.baseUrl+'v1/gateway/accounts/'+account.id+'/transactions', function(err, resp, body){
        response = JSON.parse(body)
        assert(response.success)
        assert.equal(response.gatewayTransactions.length, 2)
        done()
      }) 
    })

  })
})

