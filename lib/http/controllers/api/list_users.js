var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {

  gateway.api.listUsers(function(err, users){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ users: users });
    }
  });
  
};

