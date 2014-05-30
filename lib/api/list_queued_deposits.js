var data = require(__dirname+'/../data/');

/**
*
* List unprocessed deposits
* @requires data
* @param {function(err, deposit)} callback
* @returns [Deposit]
*/

function listQueuedDeposits(fn) {

  data.externalTransactions.readAll({
    deposit: true,
    status: 'queued'
  }, fn);

}

module.exports = listQueuedDeposits;
