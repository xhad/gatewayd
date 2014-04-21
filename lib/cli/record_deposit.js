var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* Record the deposit of an asset
*
* @param {decimal} amount
* @param {string} currency
* @param {intenger} external_account_id
* @param {function(err, deposit)} callback
* @returns {Deposit}
*/

function recordDeposit(amount, currency, external_account_id) {

  gateway.deposits.record({
    amount: amount,
    currency: currency,
    external_account_id: external_account_id
  }, function(err, deposit) {
    PrettyPrintTable.externalTransactions([deposit]);
  });
}

module.exports = recordDeposit;
