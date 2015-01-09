var validator             = require(__dirname+'/../validator.js');
var Promise               = require('bluebird');
const ExternalTransaction = require(__dirname+'/../data/').models.externalTransactions;
const ExternalAccount     = require(__dirname+'/../data/').models.externalAccounts;

function createExternalPayment(options) {
  return _validateRequest(options)
    .then(function () {
      return _findOrCreateExternalAccount(options);
    })
    .then(function (externalAccount) {
      return _recordTransaction(options, externalAccount);
    });
}

function _validateRequest(options) {
  return new Promise(function(resolve, reject) {
    if (!validator.isFloat(options.amount)) {
      return reject(new Error('amount must be numeric'));
    }
    if (!validator.isAlphanumeric(options.currency)) {
      return reject(new Error('invalid currency'));
    }
    resolve();
  });
}

function _findOrCreateExternalAccount(options) {
  var addressOptions = {
    address: options.address,
    type: options.type
  };
  return ExternalAccount.findOrCreate(addressOptions);
}

function _recordTransaction(options, externalAccount) {
  var transactionOptions = {
    external_account_id: externalAccount.id,
    amount: options.amount,
    currency: options.currency,
    status: options.state,
    deposit: options.direction === 'outgoing' ? false : true
  };
  return ExternalTransaction.create(transactionOptions);
}

module.exports = createExternalPayment;

