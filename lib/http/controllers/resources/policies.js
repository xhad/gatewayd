const Policy = require(__dirname+'/../../../data/models/policies.js');

const policiesController = {

  index: function(request, response) {
    Policy.findAll()
    .then(function(policies){ 
      response
        .status(200)
        .send({
          success: true,
          policies: policies 
        });
    })
    .error(function(error) {
      response
        .status(500)
        .send({
          success: false,
          error: error
        })
    });
  },

  show: function(request, response) {
    Policy.find({
      where: {
        id: request.params.id
      }
    })
    .then(function(policy){ 
      if (policy) {
        response
          .status(200)
          .send({
            success: true,
            policy: policy 
          });
      } else {
        response
          .status(404)
          .send({
            success: false,
            error: 'policy not found'
          });
      }
    })
    .error(function(error) {
      response
        .status(500)
        .send({
          success: false,
          error: error
        })
    });
  },
  create: function(request, response) {
    Policy.create(request.body)
    .then(function(policy){ 
      response
        .status(201)
        .send({
          success: true,
          policy: policy 
        });
    })
    .error(function(error) {
      response
        .status(500)
        .send({
          success: false,
          error: error
        })
    });
  },
  update: function(request, response) {
    Policy.find({
      where: {
        id: request.params.id
      }
    })
    .then(function(policy){ 
      if (policy) {
        delete request.body.id;
        delete request.body.createdAt;
        delete request.body.updatedAt;
        policy.updateAttributes(request.body)
        .then(function(policy) {
          response
            .status(200)
            .send({
              success: true,
              policy: policy 
            });
        })
        .error(function(error) {
          response
            .status(404)
            .send({
              success: false,
              error: 'policy not found' 
            });
        });
      } else {
        response
          .status(404)
          .send({
            success: false,
            error: 'policy not found' 
          });
      }
    })
    .error(function(error) {
      response
        .status(500)
        .send({
          success: false,
          error: error
        })
    });
  },

  destroy: function(request, response) {
    Policy.find({
      where: {
        id: request.params.id
      }
    })
    .then(function(policy){ 
      if (policy) {
        policy.destroy(request.body)
        .then(function(policy) {
          response
            .status(200)
            .send({
              success: true
            });
        })
        .error(function(error) {
          response
            .status(404)
            .send({
              success: false,
              error: 'policy not found' 
            });
        });
      } else {
        response
          .status(404)
          .send({
            success: false,
            error: 'policy not found' 
          });
      }
    })
    .error(function(error) {
      response
        .status(500)
        .send({
          success: false,
          error: error
        })
    });
  }

}

module.exports = policiesController;

