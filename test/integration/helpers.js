var request = require('request') 
var crypto = require('crypto')
var baseUrl = 'http://127.0.0.1:4000/'

module.exports = (function(){
  function createDeposit(accountId, currency, amount, fn) {
    return request.post(baseUrl+'v1/gateway/accounts/'+account.id+'/deposits', {form:{
      currency: currency, cashAmount: amount
    }}, fn)
  }

  function createUser(callback){
    username = crypto.randomBytes(256).toString('hex')
    request.post(baseUrl+'v1/gateway/users', {form:{
      name: username, password: username
    }}, callback)
  }

  function createGatewayAccount(userId, fn){
    request.post(baseUrl+'v1/gateway/users/'+userId+'/gateway_accounts', fn)
  } 

  function createUserWithAccount(fn) {  
    var user
    var account
    async.waterfall([
      function(callback){
        createUser(function(err, resp, body) {
          user = JSON.parse(body).user
          callback(null, user)
        })
      },
      function(user, callback){
        createGatewayAccount(user.id, function(e,r,body){
          account = JSON.parse(body).gatewayAccount
          callback(null, account)
        })
      }
    ], function(err, account) {
      fn({ user: user, account: account })
    })
  }

  return {
    createUser: createUser,
    createUserWithAccount: createUserWithAccount,
    createGatewayAccount: function(userId){},
    createDeposit:  createDeposit,
    createDeposit: function(gatewayAccountId, amount, currency){},
    baseUrl: baseUrl
  } 
})()
