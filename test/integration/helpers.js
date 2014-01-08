var request = require('request') 

module.exports = (function(){
  function createDeposit(accountId, currency, amount, fn) {
    request.post(baseUrl+'v1/gateway/accounts/'+account.id+'/deposits', {form:{
      currency: currency, cashAmount: amount
    }}, fn)
  }
  return {
    createUser: function(){},
    createGatewayAccount: function(userId){},
    createDeposit:  createDeposit,
    createDeposit: function(gatewayAccountId, amount, currency){}
  } 
})()
