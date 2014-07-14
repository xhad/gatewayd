var data = require(__dirname+'/../data/');

/**
* Finalize a deposit after processing
*
* @param {integer} id
* @param {integer} ripple_transaction_id 
* @param {function(err, deposit)} callback
* @returns {Deposit}
*/

function finalizeDeposit(opts, fn) {

  data.externalTransactions.update({ 
    id: opts.id,
    ripple_transaction_id: opts.ripple_transaction_id,
    status: 'processed'
  }, fn);

}

module.exports = finalizeDeposit;

