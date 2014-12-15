var api = require(__dirname+'/../../../api.js');

module.exports = function(req, res){
  api.getLiabilities(function(err, balance){
    if (err){
      res.send(500, { error: err });
    } else {
      res.send(balance);
    }
  });
};

