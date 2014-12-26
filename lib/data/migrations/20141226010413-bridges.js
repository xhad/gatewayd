var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.dropTable('bridges', callback);
};

exports.down = function(db, callback) {
  callback();
};
