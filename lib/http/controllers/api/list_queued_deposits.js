var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {

  gateway.api.listQueuedDeposits(function(err, deposits){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ deposits: deposits });
    }
  });
  
};

