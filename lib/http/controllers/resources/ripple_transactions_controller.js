var RippleTransaction = require(__dirname+'/../../../../lib/data').models.rippleTransactions;

function index(req, res){
  RippleTransaction.findAll({ where: req.query }).complete(function(err, rippleTransactions){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ ripple_transactions: rippleTransactions });
    } 
  });
}

function show(req, res){
  RippleTransaction.find({ where: { id: req.params.id }}).complete(function(err, transaction){
    if (err){
      res.send(500, {error: err});
    } else if (transaction) {
      res.send({ ripple_transaction: transaction });
    } else {
      res.send(204);
    }
  });
}

function update(request, response) {
  RippleTransaction.find(request.params.id)
  .then(function(rippleTransaction) {
    if (rippleTransaction) {
      return rippleTransaction.updateAttributes(request.body)
      .then(function(rippleTransaction) {
        response    
          .status(200)
          .send({
            success: true,
            rippleTransaction: rippleTransaction
          })
      });
    } else {
      response
        .status(404)
        .send({
          success: false,
          error: 'rippleTransaction not found'
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
  RippleTransaction.find(request.params.id)
  .then(function(rippleTransaction) {
    if (rippleTransaction) { 
      return rippleTransaction.destroy()
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
          error: 'rippleTransaction not found'
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
  RippleTransaction.create(request.body)
  .then(function(rippleTransaction){ 
    response
      .status(201)
      .send({
        success: true,
        rippleTransaction: rippleTransaction 
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

