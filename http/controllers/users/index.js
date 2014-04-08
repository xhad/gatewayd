var gateway = require('./../../../');

function externalAccounts (req, res) {
  gateway.data.externalAccounts.readAll({ user_id: req.params.id }, function(err, accounts) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ externalAccounts: accounts });
  });
};

function externalTransactions(req, res) {
  gateway.data.externalTransactions.forUser(req.params.id, function(err, transactions) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ externalTransactions: transactions });
    }
  });
}

function rippleAddresses(req, res) {

  gateway.data.rippleAddresses.readAll({ user_id: req.params.id }, function(err, addresses) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ rippleAddresses: addresses });
  });

};

function ripplePayments(req, res) {

}

function pendingDeposits(req, res) {

}

function pendingWithdrawals(req, res) {

}

function completedDeposits(req, res) {

}

function completedWithdrawals(req, res) {

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
