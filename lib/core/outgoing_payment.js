var RippleRestClient = require('ripple-rest-client');
var uuid = require('node-uuid');
var async = require('async');
var gateway = require(__dirname+'/../../');

function OutgoingPayment(outgoingPaymentRecord) {
  this.record = outgoingPaymentRecord,
  this.rippleRestClient = new RippleRestClient({
    account: gateway.config.get('HOT_WALLET').address,
    secret: gateway.config.set('HOT_WALLET').secret
  });
  console.log('RECORD', this.record);
}

OutgoingPayment.prototype = {

  sendToRippleRest: function(callback) {
    var self = this;
    var transaction = self.record;
    console.log('about to send to ripple rest');
    self._getRippleAddressRecord(function(err, address) {
      self._processOutgoingPayment(address, callback);
    });
  },
  
  _handleRippleRestResponse: function(error, response, callback) {
    if (error) {
      self._handleRippleRestFailure(error, callback);
    } else {
      self._handleRippleRestSuccess(response, callback);
    }
  },

  _confirmSuccessfulPayment: function(statusUrl, callback) {
    var self = this;
    self.rippleRestClient.pollPaymentStatus(statusUrl, function(err, payment) {
      transaction.transaction_state = payment.result;
      transaction.transaction_hash = payment.hash;
      switch(payment.result) {
      case 'tesSUCCESS':
        transaction.state = 'succeeded';
        break;
      default:
        transcation.state = 'failed';
      }
      transaction.save().complete(function(){
        //depositCallbackJob.perform([transaction.id], console.log);
        callback();
      });
    });
  },

  _handleRippleRestSuccess: function(response, callback) {
    var self = this;
    var statusUrl = resp.status_url;
    transaction.state = 'sent';
    transaction.uid = resp.client_resource_id;
    transaction.save().complete(function(){
      self._confirmSuccessfulPayment(statusUrl, callback);
    });
  },

  _handleRippleRestFailure: function(error, callback) {
    switch(error) {
      case 'retry':
        transaction.state = 'outgoing';
        break;
      case 'noPathFound':
        transaction.transaction_state = 'tecPATH_DRY';
        transaction.state = 'failed';
        break;
      default:
        transaction.state = 'failed';
    }
    transaction.save().complete(function(){
      //depositCallbackJob.perform([transaction.id], console.log);
      callback();
    });
  },

  _getRippleAddressRecord: function(callback) {
    var self = this;
    gateway.data.rippleAddresses.read(self.record.to_address_id, callback);
  },
  
  _buildPayment: function(address, callback) {
    var self = this;
    console.log('ADDRESS', address);
    self.rippleRestClient.buildPayment({
      amount: self.record.to_amount,
      currency: self.record.to_currency,
      issuer: gateway.config.get('COLD_WALLET'),
      account: gateway.config.get('HOT_WALLET').address,
      recipient: address.address
    }, function(error, response) {
      console.log('REST');
      console.log(error, response);
      if (error) { handleError(error, callback); return; }
      if (!response.success) {
        return handleError(response, callback);
      } else {
        callback(null, response);
      }
    });
  },
  
  _sendPayment: function(payment, callback) {
    rippleRestClient.sendPayment({
      payment: payment,
      client_resource_id: uuid.v4(),
      secret: gateway.config.get('HOT_WALLET').secret
    }, function(err, resp){
      if (err || !resp.success) {
        handleError(err, callback);
      } else {
        callback(null, resp);
      }
    });
  },

  _processOutgoingPayment: function(address, callback){
    var self = this;
    async.waterfall([
      function(next) {
        self._buildPayment(address, next);
      },
      function(payment, next) {
        console.log('result of _buildPayment', payment);
        self._sendPayment(payment, next);
      },
      self._handleRippleRestResponse
    ], function(error, response) {
      if (error) {
        return handleError(error, callback);
      }
      var payment = response.payments[0];
    })
  }
}

function handleError(error, callback) {
  console.log('handle error', error);
  if (typeof error === 'string' && error.match('No paths found')){
    console.log('no path found');
    callback('noPathFound', null);
  } else {
    callback('retry', null);
  }
}

module.exports = OutgoingPayment;

