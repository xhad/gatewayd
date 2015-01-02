var validator             = require(__dirname+'/../validator.js');
var Promise               = require('bluebird');
const ExternalTransaction = require(__dirname+'/../data/').models.externalTransactions;
const ExternalAccount     = require(__dirname+'/../data/').models.externalAccounts;

function createExternalPayment(options) {
  var sourceAccount, destinationAccount;
  return _validateRequest(options)
    .then(function () {
      return _findOrCreateSourceAccount(options);
    })
    .then(function (address) {
      sourceAccount = address;
      return _findOrCreateDestinationAccount(options);
    })
    .then(function (address) {
      destinationAccount = address;
      return _recordTransaction(options, destinationAccount, sourceAccount);
    });
}

function _validateRequest(options) {
  return new Promise(function(resolve, reject) {
    if (!validator.isFloat(options.destination_amount)) {
      return reject(new Error('amount must be numeric'));
    }
    if (!validator.isAlphanumeric(options.destination_currency)) {
      return reject(new Error('invalid currency'));
    }
    resolve();
  });
}

function _findOrCreateSourceAccount(options) {
  var addressOptions = {
    address: options.source_address.split(':')[1],
    type: options.source_address.split(':')[0]
  };
  return ExternalAccount.findOrCreate(addressOptions);
}

function _findOrCreateDestinationAccount(options) {
  var addressOptions = {
    address: options.destination_address.split(':')[1],
    type: options.destination_address.split(':')[0]
  };
  return ExternalAccount.findOrCreate(addressOptions);
}

function _recordTransaction(options, toAccount, fromAccount) {
  options.source_account_id      = fromAccount.id;
  options.destination_account_id = toAccount.id;
  options.deposit                = options.direction === 'outgoing' ? false : true; // DEPRECATED
  options.external_account_id    =  0; //DEPRECATED
  options.status                 =  options.state;

  return ExternalTransaction.create(options);
}

module.exports = createExternalPayment;

