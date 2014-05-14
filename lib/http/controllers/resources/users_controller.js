var User = require('ripple-gateway-data-sequelize').models.users;

function index(req, res){
  User.findAll({ where: req.query }).complete(function(err, users){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ users: users });
    } 
  });
};

function show(req, res){
  User.find({ where: { id: req.params.id }}).complete(function(err, user){
    if (err){
      res.send(500, {error: err});
    } else if (user) {
      res.send({ users: user });
    } else {
      res.send(204);
    }
  });
}

module.exports = {
  index: index,
  show: show
};

