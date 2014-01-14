validator = require('validator').validators
request = require('request')

module.exports = {
  Gateway: (function(){
    function Client(opts){
      this.clientId = this.validate(opts, 'clientId', 'isAlphanumeric')
      this.clientSecret = this.validate(opts, 'clientSecret', 'isAlphanumeric')
      this.api = opts.api || 'http://localhost:4000'
      this.request = request
    }

    Client.prototype.validate = function(opts, value, predicate) {
      function throwError() {
        throw new Error('params: '+value+' fails '+predicate+' test.')
      }

      validator['isBoolean'] = function(val) {
        return (val == true)   || (val == false) ||
               (val == 'true') || (val == 'false')
      }

      if (!!value) {  
        if (predicate == 'present') { return true }
      } else {
        throwError() 
      }
      try {
        if (validator[predicate](opts[value])) {
          return value
        } else { 
          throwError()
        }
      } catch(e) {
        throwError()
      }
    }

    Client.prototype.createRippleTransaction = function(opts, fn){
      var resource = 'http://localhost:4000/api/v1/ripple_transactions'
      params = {
        toCurrency: opts.toCurrency,
        fromCurrency: opts.fromCurrency,
        toAmount: opts.toAmount,
        fromAmount:  opts.fromAmount,
        toIssuer: opts.toIssuer,
        fromIssuer:  opts.fromIssuer,
        fromAddress:  opts.fromAddress,
        toAddress: opts.toAddress,
        sendTag: opts.sendTag,
        issuance: opts.issuance,
        txState: 'created'
      }
      request.post({ url:'http://localhost:4000/api/v1/ripple_transactions', form:params, json:true }, function(e,r,body){
        console.log(body)
        if (body.success){
          fn(null, body.rippleTransaction)
        } else if (body.error){
          fn(body.error, null)
        } else {
          fn(e,body)
        }
      })
    }

    Client.prototype.createSession = function(opts, fn) {
      opts.name = opts.username
      jar = opts.cookieJar 
      request.post({ url: 'http://localhost:4000/api/v1/sessions', form: opts, json:true, jar: jar}, function(e,r,body){
        if (body.success){
          fn(null, body.session)
        } else if (body.error){
          fn(body.error, null)
        } else {
          fn(e,body)
        }
      })
    }

    Client.prototype.createUser = function(opts, fn){
      opts.name = opts.username
      request.post({ url: 'http://localhost:4000/api/v1/gateway/users', form: opts , json:true }, function(e,r,body){
        if (body.success){
          fn(null, body.user)
        } else if (body.error){
          fn(body.error, null)
        } else {
          fn(e,body)
        }
      })
    }

    Client.prototype.getSession = function(opts, fn){
      opts.name = opts.username
      jar = opts.cookieJar 
      request.get({ url: 'http://localhost:4000/api/v1/sessions', form: opts, jar: jar, json:true }, function(e,r,body){
        if (body.success){
          fn(null, body.session)
        } else if (body.error){
          fn(body.error, null)
        } else {
          fn(e,body)
        }
      })
    }

    Client.prototype.destroySession = function(fn){
      request.post({ url: 'http://localhost:4000/api/v1/sessions' , json: true }, function(e,r,body){
        if (body.success){
          fn(null, true)
        } else if (body.error){
          fn(body.error, null)
        } else {
          fn(e,body.session)
        }
      })
    }

    Client.prototype.createRippleWithdrawal = function(opts, fn){
      request.post({ url: 'http://localhost:4000/api/v1/ripple_withdrawals', form: opts, json: true}, function(e,r,body){
        if (body.success){
          fn(null, body.rippleWithdrawal)
        } else if (body.error){
          fn(body.error, null)
        } else {
          fn(e,body.rippleWithdrawal)
        }
      })
    }

    Client.prototype.createRippleDeposit = function(opts, fn){
      request.post({ url: 'http://localhost:4000/api/v1/ripple_deposits', form: opts, json: true}, function(e,r,body){
        if (body.success){
          fn(null, body.rippleDeposit)
        } else if (body.error){
          fn(body.error, null)
        } else {
          fn(e,body)
        }
      })
    }

    Client.prototype.getBalances = function(opts, fn) {
      request.get({ url: 'http://localhost:4000/api/v1/balances', json: true}, function(e,r,body){
        console.log(body)
        console.log(e)
        if (body.success){
          fn(null, body.balances)
        } else if (body.error){
          fn(body.error, null)
        } else {
          fn(e,body)
        }
      })
    }
  

    return {
      Client: Client
    }
  })()
}
