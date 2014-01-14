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
      var resource = this.api + '/v1/ripple_transactions'
      params = {
        toCurrency: this.validate(opts,'toCurrency', 'isAlphanumeric'),
        fromCurrency: this.validate(opts, 'fromCurrency', 'isAlphanumeric'),
        toAmount: this.validate(opts, 'toAmount', 'isDecimal'),
        fromAmount: this.validate(opts, 'fromAmount', 'isDecimal'),
        toIssuer: this.validate(opts, 'toIsser', 'present'),
        fromIssuer: this.validate(opts, 'fromIssuer', 'present'),
        fromAddress: this.validate(opts, 'fromAddress', 'present'),
        toAddress: this.validate(opts, 'toAddress', 'present'),
        sendTag: this.validate(opts, 'sendTag', 'isInt'),
        issuance: this.validate(opts, 'issuance', 'isBoolean'),
        txState: 'created'
      }
      request.post({ url:'http://localhost:4000/v1/ripple_transactions', form:params, json:true }, fn)
    }

    Client.prototype.createSession = function(opts, fn) {
      opts.name = opts.username
      request.post({ url: 'http://localhost:4000/api/v1/sessions', form: opts, json:true }, function(e,r,body){
        if (body.success){
          fn(null, body.session)
        } else if (body.error){
          fn(body.error, null)
        } else {
          console.log(e)
          console.log(body)
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

    return {
      Client: Client
    }
  })()
}
