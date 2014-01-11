validator = require('validator').validators

module.exports = {
  Gateway: (function(){
    function Client(opts){
      this.clientId = this.validate(opts, 'clientId', 'isAlphanumeric')
      this.clientSecret = this.validate(opts, 'clientSecret', 'isAlphanumeric')
      this.api = this.validate(opts, 'api', 'isUrl')
    }

    Client.prototype.validate = function(opts, value, predicate) {
      function throwError() {
        throw new Error('params: '+value+' fails '+predicate+' test.')
      }

      validator['isBoolean'] = function(val) {
        return (val == true)   || (val == false) ||
               (val == 'true') || (val == 'false')
      }

      console.log(value, opts[value])
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

      
      fn(null, JSON.stringify({ success: true, rippleTransaction: params })) 
    }
    return {
      Client: Client
    }
  })()
}
