var dbm = require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.addColumn.bind(db, 'external_transactions', 'destination_account_id', {
      type: 'int'
    }),
    db.addColumn.bind(db, 'external_transactions', 'source_account_id', {
      type: 'int'
    })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.removeColumn.bind(db, 'external_transactions', 'destination_account_id'),
    db.removeColumn.bind(db, 'external_transactions', 'source_account_id')
  ], callback);
};
