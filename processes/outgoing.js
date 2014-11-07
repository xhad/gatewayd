var SqlMqWorker = require('sql-mq-worker');
var OutgoingPaymentProcessor = require(__dirname+'/../lib/core/outgoing_payment_processor.js');
var gatewayd = require(__dirname+'/../');

var worker = new SqlMqWorker({
  Class: gatewayd.data.models.rippleTransactions,
  predicate: { where: {
    state: 'outgoing'
  }},
  job: function(outgoingPayment, callback) {
    var outgoingPaymentProcessor = new OutgoingPaymentProcessor(outgoingPayment);
    outgoingPaymentProcessor.processOutgoingPayment(callback);
  }
});

worker.start();

process.on('uncaughtException', function(error) {
  gatewayd.logger.error('exception', error);
  gatewayd.logger.error('exception:stack', error.stack);
  process.exit();
});



