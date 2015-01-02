var features             = require(__dirname+'/../features');
var Promise              = require('bluebird');
var RippleTransaction    = require(__dirname+'/../data').models.rippleTransactions;
var ExternalTransaction  = require(__dirname+'/../data').models.rippleTransactions;

if (features.isEnabled('gateway-transactions')) {

  var GatewayTransaction       = require(__dirname+'/../data/').models.gatewayTransactions;
  var createRipplePayment      = require(__dirname+'/create_ripple_payment');
  var constructExternalInvoice = require(__dirname+'/construct_external_invoice');

  var format = function (gatewayTransaction) {
    return GatewayTransaction.find({
      where: { id: gatewayTransaction.id },
      include: [
        { model: RippleTransaction, as: 'RippleTransaction' },
        { model: ExternalTransaction, as: 'ExternalTransaction' }
      ]
    });
  };

  module.exports = function(options) {
    return new Promise(function(resolve, reject) {
      var direction = options.direction;
      var input, output, ripple, external;

      if (direction === 'to-ripple') {
        input  = options.external;
        output = options.ripple;
        output.direction = 'to-ripple';

        createRipplePayment(output)
          .then(function(rippleTransaction) {
            ripple = rippleTransaction;
            return constructExternalInvoice('incoming', input);
          })
          .then(function(externalTransaction) {
            external = externalTransaction;
            return GatewayTransaction.create({
              direction: direction,
              ripple_transaction_id: ripple.id,
              external_transaction_id: external.id,
              policy_id: 0
            });
          })
          .then(function(gatewayTransaction) {
            return format(gatewayTransaction);
          })
          .then(resolve)
          .error(reject);

      } else if (direction === 'from-ripple') {
        input  = options.ripple;
        output = options.external;

        constructExternalInvoice('outgoing', output)
          .then(function(externalTransaction) {
            external = externalTransaction;
            input.direction = 'from-ripple';
            return createRipplePayment(input);
          })
          .then(function(rippleTransaction) {
            ripple = rippleTransaction;
            return GatewayTransaction.create({
              direction: direction,
              ripple_transaction_id: ripple.id,
              external_transaction_id: external.id,
              policy_id: 0
            });
          })
          .then(function(gatewayTransaction) {
            return format(gatewayTransaction);
          })
          .then(resolve)
          .error(reject);
      } else {
        reject(new Error('direction must be to-ripple or from-ripple'));
      }
    });
  };
}
