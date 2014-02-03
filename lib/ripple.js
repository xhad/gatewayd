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

    Client.prototype.auth = function() {
      return auth = { 
        'user', this.clientId, 
        'pass': this.clientSecret, 
        'sendImmediately': true 
      };
    });

    Client.prototype.createUser = function(opts, fn){
      var url = this.api + '/api/v1/users';
      request.post({ url: url, form: opts , json:true, auth: this.auth() }, function(err,resp,body){
        fn(err, body);
      })
    }

    Client.prototype.getUser = function(opts, fn){
      var url = this.api + '/api/v1/users';
      request.get({ url: url, form: opts , json: true, auth: this.auth() }, function(err,resp,body){
        fn(err, body);
      })
    }

    Client.prototype.getExternalAccounts = function(opts, fn){
      var url = this.api + '/api/v1/external_accounts';
      request.get({ url: url, form: opts , json: true, auth: this.auth() }, function(err,resp,body){
        fn(err, body);
      })
    }

    Client.prototype.createExternalAccount = function(opts, fn){
      var url = this.api + '/api/v1/external_accounts';
      request.post({ url: url, form: opts , json: true, auth: this.auth() }, function(err,resp,body){
        fn(err, body);
      })
    }

    Client.prototype.createDeposit = function(opts, fn) {
      var url = this.api + '/api/v1/deposits';
      request.post({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        fn(err, body);
      });
    }

    Client.prototype.createWithdrawal = function(opts, fn) {
      var url = this.api + '/api/v1/withdrawals';
      request.post({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        fn(err, body);
      });
    }

    Client.prototype.getPendingWithdrawals = function(opts, fn) {
      var url = this.api + '/api/v1/withdrawals/pending';
      request.get({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        fn(err, body);
      });
    }

    Client.prototype.clearWithdrawal = function(opts, fn) {
      this.validate(opts, 'withdrawal_id', 'isNumeric');
      var url = this.api + '/api/v1/withdrawals/' + opts.withdrawal_id + '/clear';
      request.post({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        fn(err, body);
      });
    }

    Client.prototype.getExternalTransactions = function(opts, fn){
      var url = this.api + '/api/v1/external_transactions';
      request.get({ url: url, form: opts , json: true, auth: this.auth() }, function(err,resp,body){
        fn(err, body);
      })
    }

    Client.prototype.getSettings = function(fn) {
      var url = this.api + '/api/v1/settings';
      request.get({ url: url, json: true, auth: this.auth() }, function(err, resp, body) {
          fn(err, body);
      });
    }
   
    Client.prototype.getBalances = function(opts, fn) {
      var url = this.api + '/api/v1/balances';
      request.get({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        fn(err, body);
      });
    }

    Client.prototype.getRippleAddresses = function(opts, fn) {
      var url = this.api + '/api/v1/ripple_addresses';
      request.get({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        fn(err, body);
      });
    }

    Client.prototype.createRippleAddress = function(opts, fn) {
      var url = this.api + '/api/v1/ripple_addresses';
      request.post({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        fn(err, body);
      });
    }

    Client.prototype.createRippleTransaction = function(opts, fn) {
      var url = this.api + '/api/v1/ripple_transactions';
      request.post({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        fn(err, body);
      });
    }
  
    Client.prototype.getRippleTransactions = function(opts, fn) {
      var url = this.api + '/api/v1/ripple_transactions';
      request.get({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        fn(err, body);
      });
    }

    Client.prototype.getPendingRippleTransactions = function(opts, fn) {
      var url = this.api + '/api/v1/ripple_transactions/pending';
      request.get({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        fn(err, body);
      });
    }
  
    return {
      Client: Client
    }
  })()
}
