var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('external_transactions', 'to_account_id', {
    type: 'int'
  }, callback);
};

exports.down = function(db, callback) {
  db.addColumn('external_transactions', 'from_account_id', {
    type: 'int'
  }, callback);
};

