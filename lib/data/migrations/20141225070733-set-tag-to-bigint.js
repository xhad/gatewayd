var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.changeColumn('ripple_addresses', 'tag', {
    type: 'bigint'
  }, callback);
};

exports.down = function(db, callback) {
  db.changeColumn('ripple_addresses', 'tag', {
    type: 'int'
  }, callback);
};

