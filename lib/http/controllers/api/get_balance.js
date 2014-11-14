var api = require(__dirname+'/../../../api.js');

module.exports = function(req, res){
  api.getAccountBalance(req.query.ripple_address, function(err, balance){
    if (err){
      res.send(500, { error: err });
    } else {
      res.send(balance);
    }
  });
};

