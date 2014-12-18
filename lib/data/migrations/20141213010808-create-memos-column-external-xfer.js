var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('external_transactions', 'memos', {
    type: 'text'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('external_transactions', 'memos', callback);
};
