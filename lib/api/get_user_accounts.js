var sql = require(__dirname+'/../data/sequelize.js');
var config = require(__dirname+'/../../config/environment.js');

/**@requires sql
 * @function getUserAccounts
 *
 * @description Constructs a query to get user accounts,
 * @param {callback} fn - Callback handles query response.
 */

function getUserAccounts(fn) {
  var query = 'select u.id, u.name, address as independent_address, ea.id as external_account_id from users u inner join (select * from ripple_addresses where type=\'independent\') ra on ra.user_id = u.id inner join (select * from external_accounts where name=\'default\') ea on ea.user_id = u.id;';

  sql.query(query).then(function(resp){
    var users = [];
    for (var i=0; i<resp.length; i++) {
      var user = resp[i];
      user.withdraw_address = config.get('COLD_WALLET') + '?dt=' + user.external_account_id;
      users.push(user);
    }
    fn(null, users);
  }, function(err) {
    fn(err, null);
  });

}

module.exports = getUserAccounts;

