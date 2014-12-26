var data = require(__dirname+'/../data/');

/**
*
* List unprocessed deposits
* @requires data
* @param {function(err, deposit)} callback
* @returns [Deposit]
*/

function listQueuedDeposits(fn) {

  data.models.externalTransactions.findAll({
    deposit: true,
    status: 'queued'
  }).complete(fn);

}

module.exports = listQueuedDeposits;
