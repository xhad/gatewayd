var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {

  gateway.api.listUserExternalAccounts(req.params.id, function(err, accounts){
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send({ external_accounts: accounts });
    }
  });
  
};

