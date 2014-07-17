var ExternalAccount = require(__dirname+'/../../../../lib/data').models.externalAccounts;

function index(req, res){
  ExternalAccount.findAll({ where: req.query }).complete(function(err, externalAccounts){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ external_accounts: externalAccounts });
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

function create(req, res){
  var account = ExternalAccount.build(req.body);
  var errors = account.validate(); 
  if (errors) {
    res.send(500, {error: errors});  
  } else {
    account.save().complete(function(err, externalAccount){
      if (err) {
        res.send(500, {error: err});
      } else {
        res.send({
          success: true,
          external_account: externalAccount
        });
      }
    });
  }
}

function update(req, res){
  delete req.body.id;
  delete req.body.createdAt;
  delete req.body.updatedAt;

  ExternalAccount.find({ where: { id: req.params.id }})
    .complete(function(error, externalAccount){
      externalAccount.updateAttributes(req.body).complete(function(error, externalAccount){
        if (error) {
          res.send(500, {
            success: false,
            error: error 
          });
        } else {
          res.send({
            success: true,
            external_account: externalAccount
          });
        }
      });
    });
}

function destroy(req, res){
  ExternalAccount.find({ where: { id: req.params.id }})
    .complete(function(error, externalAccount){
      externalAccount.destroy().complete(function(){
        if (error) {
          res.send(500, {
            success: false,
            error: error 
          });
        } else {
          res.send({
            success: true
          });
        }
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

