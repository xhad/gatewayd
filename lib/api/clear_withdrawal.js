var data = require(__dirname+'/../data/');
var async = require('async');

/**
* @requires Data
* @description
* After a user sends currency from Ripple back to
* their address at the Gateway, a withdrawal record
* is created in the External Transactions table corresponding
* to one of the user's external accounts such as a bank
* account. 
*
* The integrator upon receiving notification of such a
* new withdrawal record performs some banking function to
* process the withdrawal, and then calls clearWithdrawal
* in order to finalize the withdrawal record in the Gateway.
*
* @param {integer} id
* @returns {Withdrawal}
*/

function clearWithdrawal(withdrawalId, callback) {

  async.waterfall([
    function(next) {
      _lookupWithdrawal(withdrawalId, next);
    },
    function(withdrawal, next) {
      _clearWithdrawalIfNotCleared(withdrawal, next);
    }
  ], function(error, withdrawal) {
    if (error) {
      logger.error('withdrawal:clear:failed', '- id:', withdrawalId);
    } else {
      logger.info('withdrawal:clear:success', '- id:', withdrawalId);
    }
    callback(error, withdrawal);
  });

  function _lookupWithdrawal(id, callback) {
    data.models.externalTransactions.find({ where: {
      id: id,
      deposit: false
    }}).complete(function(error, withdrawal) {
      if (error) {
        callback(error, null);
      } else if (withdrawal) {
        callback(null, withdrawal);
      } else {
        callback({
          field: 'id',
          message: 'not found'
        }, null)
      }
    });
  }

  function _clearWithdrawalIfNotCleared(withdrawal, callback){
    if (withdrawal.status === 'cleared'){
      callback({
        field: 'status',
        message: 'already cleared'
      }, null);
    } else {
      data.externalTransactions.update({
        id: withdrawal.id,
        status: 'cleared'
      }, callback);
    }
  }

}

module.exports = clearWithdrawal;

