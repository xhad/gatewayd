var ExternalAccount = require(__dirname+'/../../../../lib/data').models.externalAccounts;

function index(req, res){
  ExternalAccount.findAll({ where: req.query }).complete(function(err, externalAccounts){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({
        success: true,
        external_accounts: externalAccounts
      });
    }
  });
}

function show(req, res){
  ExternalAccount.find({ where: { id: req.params.id }}).complete(function(err, account){
    if (err){
      res.send(500, {error: err});
    } else if (account) {
      res.send({
        success: true,
        external_account: account
      });
    } else {
      res.send(204);
    }
  });
}

function update(request, response) {
  ExternalAccount.find(request.params.id)
  .then(function(externalAccount) {
    if (externalAccount) {
      return externalAccount.updateAttributes(request.body)
      .then(function(externalAccount) {
        response
          .status(200)
          .send({
            success: true,
            externalAccount: externalAccount
          });
      });
    } else {
      response
        .status(404)
        .send({
          success: false,
          error: 'externalAccount not found'
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
  ExternalAccount.find(request.params.id)
  .then(function(externalAccount) {
    if (externalAccount) {
      return externalAccount.destroy()
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
          error: 'externalAccount not found'
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
  ExternalAccount.create(request.body)
  .then(function(externalAccount){
    response
      .status(201)
      .send({
        success: true,
        externalAccount: externalAccount
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

