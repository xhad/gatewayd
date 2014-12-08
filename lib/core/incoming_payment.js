const _         = require('lodash');
const Promise   = require('bluebird');
const gatewayd  = require(__dirname + '/../../');

function IncomingPayment(payment) {
  this.payment = payment;
}

IncomingPayment.prototype = {
  processPayment: function() {
    var _this = this;
    gatewayd.logger.info('payment:notification:received:', _this.payment);
    return new Promise(function(resolve, reject) {
      _this._validatePayment()
        .then(function() {
          return _this._prepareIncomingPayment();
        })
        .then(function(preparedPayment){
          return _this._recordIncomingPayment(preparedPayment);
        })
        .then(function(rippleTransaction){
          resolve(rippleTransaction);
        })
        .catch(reject);
    });
  },
  _validatePayment: function() {
    var _this       = this;
    var coldWallet  = gatewayd.config.get('COLD_WALLET');

    return new Promise(function(resolve, reject) {
      if (_this.payment.destination_account !== coldWallet) {
        gatewayd.logger.warn('payment:incoming:error:', 'NotColdWallet');
        return reject(new Error('NotColdWallet'));
      }

      if (_this.payment.result !== 'tesSUCCESS') {
        gatewayd.logger.warn('payment:incoming:error:', 'NOTtesSUCCESS');
        return reject(new Error('NOTtesSUCCESS'));
      }

      if (!_this.payment.destination_balance_changes[0]) {
        gatewayd.logger.warn('payment:incoming:error:', 'DestinationBalanceChangesNotFound');
        return reject(new Error('DestinationBalanceChangesNotFound'));
      }

      if (!_this.payment.source_balance_changes[0]) {
        gatewayd.logger.warn('payment:incoming:error:', 'SourceBalanceChangesNotFound');
        return reject(new Error('SourceBalanceChangesNotFound'));
      }

      resolve();

    });
  },
  _prepareIncomingPayment: function() {
    var _this               = this;
    var destinationAmount   = _this.payment.destination_balance_changes[0];
    var sourceAmount        = _this.payment.source_balance_changes[0];

    var incomingPayment = {
      state                : 'incoming',
      source_amount        :  sourceAmount,
      destination_amount   :  destinationAmount,
      destination_tag      :  _.isEmpty(_this.payment.destination_tag) ? undefined : _this.payment.destination_tag,
      transaction_state    :  _this.payment.result,
      hash                 :  _this.payment.hash,
      source_account       :  _this.payment.source_account,
      invoice_id           :  _this.payment.invoice_id,
      memos                :  _this.payment.memos
    };

    return new Promise(function(resolve){
      resolve(incomingPayment);
    });
  },
  _recordIncomingPayment: function(payment) {
    return new Promise(function(resolve, reject){
      gatewayd.api.recordIncomingPayment(payment).then(resolve).error(reject);
    });
  }
};

module.exports = IncomingPayment;
