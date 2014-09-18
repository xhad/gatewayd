var User = require(__dirname+'/../../../../lib/data').models.users;

var UsersController = {};
require(__dirname+'/../../../../lib/data/controllers/users')(UsersController);

function index(req, res){
  User.findAll({ where: req.query }).complete(function(err, users){
    if (err) {
      res.send(500, {
        success: false,
        error: err
      });
    } else {
      res.send({
        success: true,
        users: users
      });
    } 
  });
}

function create(req, res){
  UsersController.create(req.body, function(error, user){
    if (error) {
      res.send(500, {
        success: false,
        error: error
      });
    } else {
      res.send({
        success: true,
        user: user
      });
    }
  });
}

function show(req, res){
  User.find({ where: { id: req.params.id }}).complete(function(err, user){
    if (err){
      res.send(500, {
        success: false,
        error: err
      });
    } else if (user) {
      res.send({
        success: true,
        users: user
      });
    } else {
      res.send(204);
    }
  });
}

function update(request, response) {
  User.find(request.params.id)
  .then(function(user) {
    if (user) {
      return user.updateAttributes(request.body)
      .then(function(user) {
        response    
          .status(200)
          .send({
            success: true,
            user: user
          })
      });
    } else {
      response
        .status(404)
        .send({
          success: false,
          error: 'user not found'
        })
    }
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      });
  })
}

function destroy(request, response) {
  User.find(request.params.id)
  .then(function(user) {
    if (user) { 
      return user.destroy()
      .then(function() {
        response    
          .status(200)
          .send({
            success: true
          })
      });
    } else {
      response    
        .status(404)
        .send({
          success: false,
          error: 'user not found'
        })
    }
  })
  .error(function(error) {
    response
      .status(500)
      .send({
        success: false,
        error: error
      });
  })
}

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};

