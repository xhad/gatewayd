var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {

  gateway.api.activateUser(req.params.id, function(err, user){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ user: user });
    }
  });
  
};

