var dbm = require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.changeColumn.bind(db, 'external_transactions', 'amount', {
      notNull: false
    }),
    db.changeColumn.bind(db, 'external_transactions', 'currency', {
      notNull: false
    })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.changeColumn.bind(db, 'external_transactions', 'amount', {
      notNull: true
    }),
    db.changeColumn.bind(db, 'external_transactions', 'currency', {
      notNull: true
    })
  ], callback);
};
