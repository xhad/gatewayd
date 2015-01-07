var SqlMqWorker = require('sql-mq-worker');
var WithdrawalProcessor = require(__dirname+'/../lib/core/withdrawal_processor.js');
var gatewayd = require(__dirname+'/../');

var worker = new SqlMqWorker({
  Class: gatewayd.data.models.rippleTransactions,
  predicate: { where: {
    state: 'incoming'
  }},
  job: function(incomingPayment, callback) {
    var withdrawalProcessor = new WithdrawalProcessor(incomingPayment);
    withdrawalProcessor.processIncomingPayment(function(error) {
      if (error) {
        var data   = incomingPayment.data || {};
        data.error = error;
        incomingPayment.updateAttributes({
          state: 'failed',
          data: data
        }).complete(callback);
      } else {
        callback();
      }
    });
  }
});

worker.start();

