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

module.exports = {
  index: index,
  show: show
};

