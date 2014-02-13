validator = require('validator').validators;
request = require('request');
request.defaults({ 
  timeout: 5000
});

// For self-signed certificates, set to "1" for production
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = {
  Gateway: (function(){
    function Client(opts){
      this.user = this.validate(opts, 'user', 'notNull');
      this.secret = this.validate(opts, 'secret', 'notNull');

      this.api = opts.api || 'https://localhost:4000';
      this.request = request;
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
        'user': this.user, 
        'pass': this.secret, 
        'sendImmediately': true 
      };
    };

    Client.prototype.createUser = function(opts, fn){
      var url = this.api + '/api/v1/users';
      request.post({ url: url, form: opts , json:true, auth: this.auth(), rejectUnauthorized: false }, function(err,resp,body){
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          if (!body.user) {
            err = body;
          }
          fn(err, body.user);
        }
      })
    }

    Client.prototype.getUser = function(opts, fn){
      var url = this.api + '/api/v1/users';
      request.get({ url: url, form: opts , json: true, auth: this.auth(), rejectUnauthorized: false }, function(err,resp,body){
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.user);
        }
      })
    }

    Client.prototype.getExternalAccounts = function(opts, fn){
      var url = this.api + '/api/v1/external_accounts';
      request.get({ url: url, form: opts , json: true, auth: this.auth() }, function(err,resp,body){
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.external_accounts);
        }
      })
    }

    Client.prototype.createExternalAccount = function(opts, fn){
      var url = this.api + '/api/v1/external_accounts';
      request.post({ url: url, form: opts , json: true, auth: this.auth() }, function(err,resp,body){
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.external_account);
        }
      })
    }

    Client.prototype.createDeposit = function(opts, fn) {
      var url = this.api + '/api/v1/deposits';
      request.post({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.deposit);
        }
      });
    }

    Client.prototype.createWithdrawal = function(opts, fn) {
      var url = this.api + '/api/v1/withdrawals';
      request.post({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.withdrawal);
        }
      });
    }

    Client.prototype.getPendingWithdrawals = function(opts, fn) {
      var url = this.api + '/api/v1/withdrawals/pending';
      request.get({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.withdrawals);
        }
      });
    }

    Client.prototype.clearWithdrawal = function(opts, fn) {
      this.validate(opts, 'withdrawal_id', 'isNumeric');
      var url = this.api + '/api/v1/withdrawals/' + opts.withdrawal_id + '/clear';
      request.post({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.withdrawal);
        }
      });
    }

    Client.prototype.getExternalTransactions = function(opts, fn){
      var url = this.api + '/api/v1/external_transactions';
      request.get({ url: url, form: opts , json: true, auth: this.auth() }, function(err,resp,body){
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.external_transactions);
        }
      })
    }

    Client.prototype.getSettings = function(fn) {
      var url = this.api + '/api/v1/settings';
      request.get({ url: url, json: true, auth: this.auth() }, function(err, resp, body) {
        if (resp.statusCode == 200) {
          fn(err, body.settings);
        } else {
          fn(resp.statusCode, body);
        }
      });
    }
   
    Client.prototype.getBalances = function(opts, fn) {
      var url = this.api + '/api/v1/balances';
      request.get({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.balances);
        }
      });
    }

    Client.prototype.getRippleAddresses = function(opts, fn) {
      if (typeof opts == 'function') {
        fn = opts;
        opts = {};
      }
      var url = this.api + '/api/v1/ripple_addresses';
      request.get({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.ripple_addresses);
        }
      });
    }

    Client.prototype.createRippleAddress = function(opts, fn) {
      var url = this.api + '/api/v1/ripple_addresses';
      request.post({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        if (err) { throw new Error(err) };
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(null, body.ripple_address);
        }
      });
    }

    Client.prototype.sendPayment = function(opts, fn) {
      var url = this.api + '/api/v1/ripple_transactions';
      request.post({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.payment);
        }
      });
    }
  
    Client.prototype.getPayments = function(opts, fn) {
      var url = this.api + '/api/v1/ripple_transactions';
      if (typeof opts == 'function') {
        fn = opts;
        opts = {};
      }
      request.get({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        if (!(resp.statusCode == 200)) {
          fn(body, null);
        } else {
          fn(err, body.payments);
        }
      });
    }

    Client.prototype.getPendingPayments = function(opts, fn) {
      var url = this.api + '/api/v1/ripple_transactions/pending';
      request.get({ url: url, form: opts, json: true, auth: this.auth() }, function(err, resp, body) {
        if (!(resp.statusCode == 200)) {
          fn(resp.statusCode, body);
        } else {
          fn(err, body.payments);
        }
      });
    }
  
    return {
      Client: Client
    }
  })()
}
