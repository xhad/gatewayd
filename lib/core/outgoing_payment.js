var RippleRestClient = require('ripple-rest-client');
var uuid = require('node-uuid');
var async = require('async');
var gateway = require(__dirname+'/../../');
var hotWallet = gateway.config.get('HOT_WALLET');

function OutgoingPayment(outgoingPaymentRecord) {
  this.record = outgoingPaymentRecord,
  this.rippleRestClient = new RippleRestClient({
    account: hotWallet.address,
    secret: hotWallet.secret
  });
}

OutgoingPayment.prototype = {

  sendToRippleRest: function(callback) {
    var self = this;
    var transaction = self.record;
    self._getRippleAddressRecord(function(err, address) {
      self._processOutgoingPayment(address, callback);
    });
  },
  
  _confirmSuccessfulPayment: function(statusUrl, callback) {
    var self = this;
    self.rippleRestClient.pollPaymentStatus(statusUrl, function(error, payment) {
      if (error) {
        return callback(error, null);
      } 
      self.record.transaction_state = payment.result;
      self.record.transaction_hash = payment.hash;
      switch(payment.result) {
      case 'tesSUCCESS':
        self.record.state = 'succeeded';
        break;
      default:
        self.record.state = 'failed';
      }
      self.record.save().complete(function(){
        //depositCallbackJob.perform([self.record.id], console.log);
        callback();
      });
    });
  },

  _handleRippleRestSuccess: function(response, callback) {
    var self = this;
    var statusUrl = response.status_url;
    self.record.state = 'sent';
    self.record.uid = response.client_resource_id;
    self.record.save().complete(function(){
      self._confirmSuccessfulPayment(statusUrl, callback);
    });
  },

  _handleRippleRestFailure: function(error, callback) {
    var self = this;
    if (typeof error === 'string' && error.match('No paths found')){
      error = 'noPathFound';
    }
    switch(error) {
      case 'retry':
        self.record.state = 'outgoing';
        break;
      case 'noPathFound':
        self.record.transaction_state = 'tecPATH_DRY';
        self.record.state = 'failed';
        break;
      default:
        self.record.state = 'failed';
    }
    self.record.save().complete(function(){
      //depositCallbackJob.perform([self.record.id], console.log);
      callback();
    });
  },

  _getRippleAddressRecord: function(callback) {
    var self = this;
    gateway.data.rippleAddresses.read(self.record.to_address_id, callback);
  },
  
  _buildPayment: function(address, callback) {
    var self = this;
    self.rippleRestClient.buildPayment({
      amount: self.record.to_amount,
      currency: self.record.to_currency,
      issuer: gateway.config.get('COLD_WALLET'),
      account: hotWallet.address,
      recipient: address.address
    }, function(error, response) {
      if (error) { 
        callback(error.message, null); 
      }
      if (response.success) {
        callback(null, response.payments[0]);
      } else {
        callback(response.message, null);
      }
    });
  },
  
  _sendPayment: function(payment, callback) {
    var self = this;
    self.rippleRestClient.sendPayment({
      payment: payment,
      client_resource_id: uuid.v4(),
      secret: hotWallet.secret
    }, function(error, response){
      if (error) {
        callback(error, null);
      } else if (response.success){
        callback(null, response);
      } else {
        callback(response.message, null);
      }
    });
  },

  _processOutgoingPayment: function(address, callback) {
    var self = this;
    async.waterfall([
      function(next) {
        self._buildPayment(address, next);
      },
      function(payment, next) {
        self._sendPayment(payment, next);
      },
      function(response, next) {
        self._handleRippleRestSuccess(response, next);
      }
    ], function(error, response) {
      if (error) {
        self._handleRippleRestFailure(error, function() {
          console.log('failure!!', self.record.toJSON());
          callback();
        });
      } else {
        console.log('success!!', self.record.toJSON());
        callback();
      }
    })
  }
  
}

module.exports = OutgoingPayment;

