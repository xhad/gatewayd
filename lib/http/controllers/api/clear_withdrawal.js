var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {
  
  gateway.api.clearWithdrawal(req.params.id, function(err, withdrawal){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ withdrawal: withdrawal });
    }
  });
  
};

