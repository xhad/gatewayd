var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){

  var currency = req.body.currency;
  var amount = req.body.amount;

  gateway.api.refundColdWallet(currency, amount,function(err, resp){
    if (err) {
      res.send(500, { error: err });  
    } else {
      res.send({ ripple_transaction: resp });
    }
  });  

};
