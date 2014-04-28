var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  gateway.api.retryFailedPayment(req.params.id, function(err, payment){
    if (err){
      res.send(500, { error: err });
    } else {
      res.send({ payment: payment });
    }
  });
};
