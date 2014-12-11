var data = require(__dirname+'/../data/');

/**
* @requires Data
*
* @description Record the deposit of an asset in the gateway
* for issuance on the Ripple network, in the External
* Transactions database table. A state of "queued" is
* given to the deposit record to be processed by the 
* deposit process, often taking a fee before enqueuing
* to be send to Ripple.
*
* @param {string} currency The currency code to be issued on Ripple
* @param {decimal} amount  The amount of the asset deposited
* @param {integer} external_account_id e.g. bank account record id, which is tied to a user record
* @param {json} data Miscellaneous json data stored serialized
* @param {function(err, {Deposit})} callback Function with error and External Transaction
* @returns {Deposit}
*/

function recordDeposit(options, callback) {

  data.models.externalAccounts.find({ where: {id: options.external_account_id}})
    .success(function(externalAccount) {
      if (!externalAccount) {
        logger.error('deposit:failed', 'no externalAccount with id: ' + options.external_account_id);
        return callback(new Error('no externalAccount with id: ' + options.external_account_id), null);
      }
      data.externalTransactions.create({
        external_account_id: options.external_account_id,
        currency: options.currency,
        amount: options.amount,
        deposit: true,
        status: 'queued',
        data: options.data
      }, callback);
    });



}

module.exports = recordDeposit;
