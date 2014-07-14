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

module.exports = {
  index: index,
  show: show
};

