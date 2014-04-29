var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {

  var opts =  {
    external_account_id: req.body.external_account_id,
    amount: req.body.amount,
    currency: req.body.currency,
    data: req.body.data
  };

  if (opts.external_account_id && opts.amount && opts.currency) {

    gateway.api.recordDeposit(opts, function(err, deposit){
      if (err) {
        res.send(500, {error: err});
      } else {
        res.send({ deposit: deposit });
      }
    });
  
  } else {
    res.send(500, { required: [
      'external_account_id', 
      'amount', 
      'currency'
    ]});
  }
};

