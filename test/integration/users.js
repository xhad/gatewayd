var request = require('request')
var assert = require('assert')
var crypto = require('crypto')
baseUrl = 'http://127.0.0.1:4000/'

describe('creating a gateway user', function(){
  afterEach(function(){
    console.log(this.currentTest.title)
  })

  before(function(){ 
    console.log("Creating a User")
    console.log("-------------------------------------------------------")
    var url = baseUrl + '/api/v1/gateway/users'
  })
  it('should require a name', function(done){
    request.post(baseUrl+'v1/gateway/users', {form:{}}, function(e,r,body) {
      resp = JSON.parse(body)
      assert(resp.error)
      done()
    })
  }) 

  it('should require a password', function(done){
    username = crypto.randomBytes(256).toString('hex')
    request.post(baseUrl+'v1/gateway/users', {form:{
      name: username
    }}, function(e,r,body) {
      resp = JSON.parse(body)
      assert(resp.error)
      done()
    })
  }) 

  it('should create a user account with valid params', function(done){
    username = crypto.randomBytes(256).toString('hex')
    request.post(baseUrl+'v1/gateway/users', {form:{
      name: username, password: username
    }}, function(e,r,body) {
      body = JSON.parse(body)
      assert.equal(body.name, username)
      done()
    })
  }) 

  it('should not create a second user with the same name', function(done){
    username = crypto.randomBytes(256).toString('hex')
    request.post(baseUrl+'v1/gateway/users', {form:{
      name: username, password: username, rippleAddress: 'rHKueQebtVU9cEamhBbMV8AEViqKjXcB'
    }}, function(e,r,body) {
      request.post(baseUrl+'v1/gateway/users', {form:{
        name: username, password: username
      }}, function(e,r,body) {
        resp = JSON.parse(body)
        assert(resp.error)
        done()
      })
    })
  }) 
})

describe("getting a user's account", function(){
  before(function(){
    console.log("")
    console.log("Getting a user's account")
    console.log("-------------------------------------------------------")
    createUser = function(callback){
      username = crypto.randomBytes(256).toString('hex')
      request.post(baseUrl+'v1/gateway/users', {form:{
        name: username, password: username
      }}, callback)
    }
  })

  afterEach(function(){
    console.log(this.currentTest.title)
  })

  it('should return empty if the user does not have an account', function(done){
    createUser(function(e,r,body) {
      user = JSON.parse(body)
      request.get(baseUrl+'v1/gateway/users/'+user.id+'/gateway_account', function(e,r,body){
        assert(!body)
        done()
      })
    })
  })
})
