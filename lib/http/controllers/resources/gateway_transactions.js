var GatewayTransaction = require(__dirname+'/../../../../lib/data').models.gatewayTransactions;

function index(req, res){
  GatewayTransaction.findAll({ where: req.query }).complete(function(err, gatewayTransactions){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ gateway_transactions: gatewayTransactions });
    }
  });
}

function show(req, res){
  GatewayTransaction.find({ where: { id: req.params.id }}).complete(function(err, transaction){
    if (err){
      res.send(500, {error: err});
    } else if (transaction) {
      res.send({ gateway_transaction: transaction });
    } else {
      res.send(204);
    }
  });
}

function update(request, response) {
  GatewayTransaction.find(request.params.id)
  .then(function(gatewayTransaction) {
    if (gatewayTransaction) {
      return gatewayTransaction.updateAttributes(request.body)
      .then(function(gatewayTransaction) {
        response
          .status(200)
          .send({
            success: true,
            gatewayTransaction: gatewayTransaction
          });
      });
    } else {
      response
        .status(404)
        .send({
          success: false,
          error: 'gatewayTransaction not found'
        });
    }
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      });
  });
}

function destroy(request, response) {
  GatewayTransaction.find(request.params.id)
  .then(function(gatewayTransaction) {
    if (gatewayTransaction) {
      return gatewayTransaction.destroy()
      .then(function() {
        response
          .status(200)
          .send({
            success: true
          });
      });
    } else {
      response
        .status(404)
        .send({
          success: false,
          error: 'gatewayTransaction not found'
        });
    }
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      });
  });
}

function create(request, response) {
  GatewayTransaction.create(request.body)
  .then(function(gatewayTransaction){
    response
      .status(201)
      .send({
        success: true,
        gatewayTransaction: gatewayTransaction
      });
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      });
  });
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};
