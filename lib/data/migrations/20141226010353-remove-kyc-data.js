var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.dropTable('kyc_data', callback);
};

exports.down = function(db, callback) {
  callback();
};
