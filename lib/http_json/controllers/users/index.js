var gateway = require(__dirname+'/../../../../');

function externalAccounts (req, res) {
  if (parseInt(req.params.id) != parseInt(req.user.id)) { res.send(401); return; }

  gateway.data.externalAccounts.readAll({ user_id: req.params.id }, function(err, accounts) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ externalAccounts: accounts });
  });
};

function externalTransactions(req, res) {
  if (parseInt(req.params.id) != parseInt(req.user.id)) { res.send(401); return; }

  gateway.data.externalTransactions.forUser(req.params.id, function(err, transactions) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ externalTransactions: transactions });
    }
  });
}

function rippleAddresses(req, res) {
  if (parseInt(req.params.id) != parseInt(req.user.id)) { res.send(401); return; }

  gateway.data.rippleAddresses.readAll({ user_id: req.params.id }, function(err, addresses) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ rippleAddresses: addresses });
  });

};

function rippleTransactions(req, res) {
  if (parseInt(req.params.id) != parseInt(req.user.id)) { res.send(401); return; }

  gateway.data.rippleTransactions.forUser(req.user.id, function(err, rippleTransactions) {
    if (err) { res.send(500, { error: err }); return; }
    res.send(200, { rippleTransactions: rippleTransactions });
  });

}

var controller = {
  externalAccounts: externalAccounts,
  externalTransactions: externalTransactions,
  rippleAddresses: rippleAddresses,
  rippleTransactions: rippleTransactions
};

module.exports = controller;
