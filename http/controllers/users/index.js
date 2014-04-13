var gateway = require('./../../../');

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

function ripplePayments(req, res) {
  if (parseInt(req.params.id) != parseInt(req.user.id)) { res.send(401); return; }

}

function pendingDeposits(req, res) {
  if (parseInt(req.params.id) != parseInt(req.user.id)) { res.send(401); return; }

}

function pendingWithdrawals(req, res) {
  if (parseInt(req.params.id) != parseInt(req.user.id)) { res.send(401); return; }

}

function completedDeposits(req, res) {
  if (parseInt(req.params.id) != parseInt(req.user.id)) { res.send(401); return; }

}

function completedWithdrawals(req, res) {
  if (parseInt(req.params.id) != parseInt(req.user.id)) { res.send(401); return; }

}


var controller = {
  external_payments: {

  }, 
  ripple_payments: {

  },
  externalAccounts: externalAccounts,
  externalTransactions: externalTransactions,
  rippleAddresses: rippleAddresses,
  user: {

  } 
};

module.exports = controller;
