var data = require(__dirname+'/../data/');

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

function clearWithdrawal(id, fn) {
  var opts = { 
    id: id, 
    status: 'cleared'
  };  
  data.externalTransactions.update(opts, fn);
}

module.exports = clearWithdrawal;

