var api = require(__dirname+'/../../../api');

module.exports = function(request, response, next) {

  api.createGatewayTransaction(request.body)
    .then(function(gatewayTransaction) {
      response.status(200).send({
        success: true,
        gateway_transaction: gatewayTransaction
      });
    })
    .error(next);
};

