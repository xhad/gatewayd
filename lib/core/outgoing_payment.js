const RippleRestClient = require('ripple-rest-client');
const uuid = require('node-uuid');
const gateway = require(__dirname+'/../../');
const hotWallet = gateway.config.get('HOT_WALLET');
const util = require('util');
const Promise = require('bluebird');

function OutgoingPayment(outgoingPaymentRecord) {
  this.record = outgoingPaymentRecord;
  this.rippleRestClient = new RippleRestClient({
    api: gateway.config.get('RIPPLE_REST_API'),
    account: hotWallet.address,
    secret: hotWallet.secret
  });
}

OutgoingPayment.prototype = {

  processOutgoingPayment: function(callback) {
    var _this = this;

    _this._getRippleAddressRecord()
      .then(function(address){
        return _this._buildPayment(address);
      })
      .then(function(payment){
        return _this._sendAndConfirmPayment(payment);
      })
      .then(function(paymentResponse){
        return _this._recordAcceptanceOrRejectionStatus(paymentResponse);
      })
      .then(function(){
        logger.info('payment:outgoing:succeeded', _this.record.toJSON());
        callback(null, _this.record);
      })
      .catch(function(error){
        _this._rippleRestResponseHandler(error).then(function(){
          callback(error, _this.record);
        });
      });
  },

  _recordAcceptanceOrRejectionStatus: function(payment) {
    var _this = this;

    _this.record.transaction_state = payment.result;
    _this.record.transaction_hash = payment.hash;

    switch(_this.record.transaction_state) {
    case 'tesSUCCESS':
      _this.record.state = 'succeeded';
      break;
    default:
      _this.record.state = 'failed';
    }
    
    return new Promise(function(resolve, reject) {
      _this.record.save().complete(function(error, record){
        if (error) {
          reject(error);
        } else {
          resolve(record);
        }
      });  
    });
  },

  _rippleRestResponseHandler: function(error) {
    var _this = this;
    var normalizedError;

    const normalized_error_messages = {
      no_paths_found: 'noPathFound',
      insufficient_balance: 'insufficientFeeBalance'
    };
    //Gatewayd Responses
    const failed = 'failed';
    const retry = 'retry';

    const ripple_rest_errors = {
      no_paths_found: 'No Paths Found',
      transaction_not_found: 'Transaction not found'
    };

    const rippled_error_codes = {
      insufficient_balance: 'terINSUF_FEE_B',
      max_ledger: 'tefMAX_LEDGER',
      no_paths_found: 'tecPATH_DRY',
      rippled_busy: 'Rippled Busy'
    };


    const rippleRestErrorNormalizer = {
      connection: function() {
        return retry;
      },
      server: function() {
        return retry;
      },
      invalid_request: function(error) {
        switch (error.error) {
          case ripple_rest_errors.no_paths_found:
            return normalized_error_messages.no_paths_found;
            break;
          case ripple_rest_errors.transaction_not_found:
            return retry;
            break;
          default:
            return;
        }
      },
      transaction: function(error) {
        switch (error.error) {
          case rippled_error_codes.max_ledger:
          case rippled_error_codes.rippled_busy:
            return retry;
            break;
          case rippled_error_codes.insufficient_balance:
            return 'insufficientFeeBalance';
            break;
          default:
            return;
        }

      }
    };

    return new Promise(function(resolve, reject){

      if (typeof rippleRestErrorNormalizer[error.error_type] === 'function') {
        normalizedError = rippleRestErrorNormalizer[error.error_type](error);
      } else if (util.isError(error)) {
        normalizedError = retry;
        logger.error('ripplerest:error:retrying', error);
      } else if (typeof error.error === 'object') {
        _this.record.data = error.error;
      }

      switch(normalizedError) {
        case retry:
          logger.info('payments:outgoing:retrying', error, _this.record.toJSON());
          break;
        case normalized_error_messages.no_paths_found:
          _this.record.transaction_state = rippled_error_codes.no_paths_found;
          _this.record.state = failed;
          break;
        case normalized_error_messages.insufficient_balance:
          _this.record.transaction_state = rippled_error_codes.insufficient_balance;
          _this.record.state = failed;
          break;
        default:
          _this.record.state = failed;
          _this.record.data = error;
          logger.error('payments:outgoing:failed', error, _this.record.toJSON());
      }

      _this.record.save().complete(function(){
        resolve({ record: _this.record.toJSON(), handled: normalizedError });
      });
    });
  },

  _getRippleAddressRecord: function() {
    var _this = this;
    return new Promise(function(resolve, reject) {
      gateway.data.rippleAddresses.read(_this.record.to_address_id, function(error, response){
        if (error) {
          reject(error)
        } else {
          resolve(response);
        }
      });
    });

  },
  
  _buildPayment: function(address) {
    var _this = this;
    var paymentObject = {
      amount: _this.record.to_amount,
      currency: _this.record.to_currency,
      issuer: _this.record.to_issuer,
      account: hotWallet.address,
      recipient: address.address
    };

    return new Promise(function(resolve, reject) {
      _this.rippleRestClient.buildPayment(paymentObject, function(error, response) {
        if (error) {
          reject(error);
        } else {
          var payment = response.payments[0];
          if (address.tag) {
            payment.destination_tag = address.tag.toString();
          }
          resolve(payment);
        }
      });
    });

  },

  _sendAndConfirmPayment: function(payment) {
    var _this = this;
    if (payment) {
      if (payment.source_tag) {
        payment.source_tag = _this.record.from_address_id.toString();
      }

      var paymentObject = {
        payment: payment,
        client_resource_id: uuid.v4(),
        secret: hotWallet.secret
      };

      return new Promise(function(resolve, reject) {
        _this.rippleRestClient.sendAndConfirmPayment(paymentObject, function(error, response){
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });

    }
  }
};

module.exports = OutgoingPayment;
