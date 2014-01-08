var request = require('request')
var assert = require('assert')
var crypto = require('crypto')
baseUrl = 'http://127.0.0.1:4000/'

describe('creating a gateway account', function(){
  afterEach(function(){
   console.log(this.currentTest.title)
  })
  before(function(){ 
    console.log("Creating a Gateway Account")
    console.log("-------------------------------------------------------")
    var url = baseUrl + '/api/v1/gateway/users'
  })
  it('should create a gateway account given a userId', function(done){
    id = crypto.randomBytes(20).toString('hex')
    request.post(baseUrl+'v1/gateway/users/'+id+'/gateway_accounts', function(e,r,body) {
      resp = JSON.parse(body)
      assert.equal(resp.userId, id)
      done()
    })
  }) 

  it('should not create more than one gateway account per user', function(done){
    id = crypto.randomBytes(20).toString('hex')
    request.post(baseUrl+'v1/gateway/users/'+id+'/gateway_accounts', function(e,r,body) {
      request.post(baseUrl+'v1/gateway/users/'+id+'/gateway_accounts', function(e,r,body) {
        resp = JSON.parse(body)
        assert(resp.error)
        done()
      })
    })
  })
})
