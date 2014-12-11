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

function update(request, response) {
  RippleAddress.find(request.params.id)
  .then(function(rippleAddress) {
    if (rippleAddress) {
      return rippleAddress.updateAttributes(request.body)
      .then(function(rippleAddress) {
        response
          .status(200)
          .send({
            success: true,
            rippleAddress: rippleAddress
          });
      });
    } else {
      response
        .status(404)
        .send({
          success: false,
          error: 'rippleAddress not found'
        });
    }
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      });
  });
}

function destroy(request, response) {
  RippleAddress.find(request.params.id)
  .then(function(rippleAddress) {
    if (rippleAddress) {
      return rippleAddress.destroy()
      .then(function() {
        response
          .status(200)
          .send({
            success: true
          });
      });
    } else {
      response
        .status(404)
        .send({
          success: false,
          error: 'rippleAddress not found'
        });
    }
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      });
  });
}

function create(request, response) {
  RippleAddress.create(request.body)
  .then(function(rippleAddress){
    response
      .status(201)
      .send({
        success: true,
        rippleAddress: rippleAddress
      });
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      });
  });
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};

