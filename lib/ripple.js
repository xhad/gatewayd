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


    Client.prototype.createRippleTransaction = function(opts, fn) {
      opts.transaction_state = 'created';
      request.post({ url: 'http://localhost:4000/api/v1/users/'+opts.user_id+'/ripple_transactions', form: opts, json: true}, function(e,r,body){
        if (body.success){
          fn(null, body.rippleDeposit)
        } else if (body.error){
          fn(body.error, null)
        } else {
          fn(e,body)
        }
      })
    }

    Client.prototype.createExternalTransaction = function(opts, fn) {
      request.post({ url: 'http://localhost:4000/api/v1/users/'+opts.user_id+'/external_transactions', form: opts, json: true}, function(e,r,body){
        if (body.success){
          fn(null, body.external_transaction)
        } else if (body.error){
          fn(body.error, null)
        } else {
          fn(e,body)
        }
      })
    }

    Client.prototype.getSettings = function(fn) {
      request.get({ url: (this.api + '/api/v1/settings'), json: true },
        function(err, resp, body) {
          if (body.success) {
            fn(null, body.settings.hotWallet);
          } else {
            fn(err, null);
          }
      });
    }

    return {
      Client: Client
    }
  })()
}
