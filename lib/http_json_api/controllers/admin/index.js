var gateway = require('./../../../');

function rippleAddresses(req, res) {
  gateway.data.rippleAddresses.readAll({}, function(err, addresses) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ ripple_addresses: addresses });
  });
};

function externalAccounts(req, res) {
  gateway.data.externalAccounts.readAll({}, function(err, accounts) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ external_accounts: accounts });
  });
}

function pendingWithdrawals(req, res) {
  gateway.withdrawals.listPending(function(err, withdrawals){
    if (err) { res.send(500, { error: err }); return; }
    res.send({ withdrawals: withdrawals });
  });
}

function clearPendingWithdrawal(req, res) {
  gateway.withdrawals.clear(req.params.id, function(err, withdrawal) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ withdrawal: withdrawal });
  });
}

function users(req, res) {
  gateway.users.listAccounts(function(err, users) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ users: users });
  });
}

function pendingDeposits(req, res) {
  gateway.deposits.listQueued(function(err, deposits) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ deposits:  deposits });
    }
  });
}

function recordDeposit(req, res) {
  gateway.deposits.record({
    currency: req.body.currency,
    amount: req.body.amount,
    external_account_id: req.body.external_account_id
  }, function(err, deposit) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ deposit:  deposit });
    }
  });
}

function outgoingRipplePayments(req, res) {
  gateway.payments.listOutgoing(function(err, payments) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ payments: payments });
    }
  });
}

function incomingRipplePayments(req, res) {
  gateway.payments.listIncoming(function(err, payments) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ payments: payments });
    }
  });
}

module.exports = {
  rippleAddresses: rippleAddresses,
  externalAccounts: externalAccounts,
  pendingWithdrawals: pendingWithdrawals,
  clearPendingWithdrawal: clearPendingWithdrawal,
  users: users,
  pendingDeposits: pendingDeposits,
  recordDeposit: recordDeposit,
  outgoingRipplePayments: outgoingRipplePayments,
  incomingRipplePayments: incomingRipplePayments
}

