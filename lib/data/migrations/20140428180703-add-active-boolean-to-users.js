var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('users', 'active', {
    type: 'boolean',
    defaultValue: false
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('users', 'active', callback);
};

