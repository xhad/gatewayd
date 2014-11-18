const RippleTransactions = require(__dirname+'/../data/').models.rippleTransactions;
const RippleAddresses = require(__dirname+'/../data/').models.rippleAddresses;

/**
 * @requires data
 * List outgoing payments
 *
 * @param {function(err, deposit)} callback
 * @returns [Payment]
 */

function listOutgoingPayments(callback) {
  RippleTransactions.findAll({
    where: { state: 'outgoing' },
    include: [
      { model: RippleAddresses, as: 'ToAddress' },
      { model: RippleAddresses, as: 'FromAddress' }
    ]
  }).then(function(rippleTransactions) {
    return callback(null, rippleTransactions);
  }).error(function(error) {
    return callback(error, null);
  });
}

module.exports = listOutgoingPayments;
