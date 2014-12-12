var dbm = require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.addColumn.bind(db, 'external_transactions', 'source_amount', {
      type: 'decimal'
    }),
    db.addColumn.bind(db, 'external_transactions', 'source_currency', {
      type: 'string'
    }),
    db.addColumn.bind(db, 'external_transactions', 'destination_amount', {
      type: 'decimal'
    }),
    db.addColumn.bind(db, 'external_transactions', 'destination_currency', {
      type: 'string'
    })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.removeColumn.bind(db, 'external_transactions', 'source_amount'),
    db.removeColumn.bind(db, 'external_transactions', 'source_currency'),
    db.removeColumn.bind(db, 'external_transactions', 'destination_amount'),
    db.removeColumn.bind(db, 'external_transactions', 'destination_currency')
  ], callback);
};
