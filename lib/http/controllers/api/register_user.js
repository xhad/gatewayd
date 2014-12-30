var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {

  var opts = {
    name: req.body.name,
    password: req.body.password,
    ripple_address: req.body.ripple_address
  };

  if (!req.body.password || !req.body.name || !req.body.ripple_address) {
    return res.status(500).send({ error: 'invalid params: password, name, and ripple_address are requrired' });
  }

  gateway.api.registerUser(opts, function(err, user){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ user: user });
    }
  });
  
};
