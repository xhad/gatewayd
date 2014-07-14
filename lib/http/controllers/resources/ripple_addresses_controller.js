var RippleAddress = require(__dirname+'/../../../../lib/data').models.rippleAddresses;

function index(req, res){
  RippleAddress.findAll({ where: req.query }).complete(function(err, rippleAddresses){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ ripple_addresses: rippleAddresses });
    } 
  });
}

function show(req, res){
  RippleAddress.find({ where: { id: req.params.id }}).complete(function(err, address){
    if (err){
      res.send(500, {error: err});
    } else if (address) {
      res.send({ ripple_address: address });
    } else {
      res.send(204);
    }
  });
}

module.exports = {
  index: index,
  show: show
};

