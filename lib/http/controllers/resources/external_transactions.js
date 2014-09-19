var ExternalTransaction = require(__dirname+'/../../../../lib/data').models.externalTransactions;

function index(req, res){
  ExternalTransaction.findAll({ where: req.query }).complete(function(err, externalTransactions){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ external_transactions: externalTransactions });
    } 
  });
}

function show(req, res){
  ExternalTransaction.find({ where: { id: req.params.id }}).complete(function(err, transaction){
    if (err){
      res.send(500, {error: err});
    } else if (transaction) {
      res.send({ external_transaction: transaction });
    } else {
      res.send(204);
    }
  });
}

function update(request, response) {
  ExternalTransaction.find(request.params.id)
  .then(function(externalTransaction) {
    if (externalTransaction) {
      return externalTransaction.updateAttributes(request.body)
      .then(function(externalTransaction) {
        response    
          .status(200)
          .send({
            success: true,
            externalTransaction: externalTransaction
          })
      });
    } else {
      response
        .status(404)
        .send({
          success: false,
          error: 'externalTransaction not found'
        })
    }
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      });
  })
}

function destroy(request, response) {
  ExternalTransaction.find(request.params.id)
  .then(function(externalTransaction) {
    if (externalTransaction) { 
      return externalTransaction.destroy()
      .then(function() {
        response    
          .status(200)
          .send({
            success: true
          })
      });
    } else {
      response    
        .status(404)
        .send({
          success: false,
          error: 'externalTransaction not found'
        })
    }
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      });
  })
}

function create(request, response) {
  ExternalTransaction.create(request.body)
  .then(function(externalTransaction){ 
    response
      .status(201)
      .send({
        success: true,
        externalTransaction: externalTransaction 
      });
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      })
  });
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};

