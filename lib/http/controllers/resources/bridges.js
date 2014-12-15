var Bridge = require(__dirname+'/../../../../lib/data').models.bridges;

function index(req, res){
  Bridge.findAll({ where: req.query }).complete(function(err, bridges){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ bridges: bridges });
    }
  });
}

function show(req, res){
  Bridge.find({ where: { id: req.params.id }}).complete(function(err, bridge){
    if (err){
      res.send(500, {error: err});
    } else if (bridge) {
      res.send({ bridge: bridge });
    } else {
      res.send(204);
    }
  });
}

function update(request, response) {
  Bridge.find(request.params.id)
  .then(function(bridge) {
    if (bridge) {
      return bridge.updateAttributes(request.body)
      .then(function(bridge) {
        response
          .status(200)
          .send({
            success: true,
            bridge: bridge
          });
      });
    } else {
      response
        .status(404)
        .send({
          success: false,
          error: 'bridge not found'
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
  Bridge.find(request.params.id)
  .then(function(bridge) {
    if (bridge) {
      return bridge.destroy()
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
          error: 'bridge not found'
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
  Bridge.create(request.body)
  .then(function(bridge){
    response
      .status(201)
      .send({
        success: true,
        bridge: bridge
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
