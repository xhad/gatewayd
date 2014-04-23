var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {

  gateway.api.listOutgoingPayments(function(err, payments){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ payments: payments });
    }
  });
  
};

