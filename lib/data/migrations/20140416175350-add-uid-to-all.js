var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.addColumn.bind(db, 'users', 'uid', {
      type: 'string',
      unique: true
    }),
    db.addColumn.bind(db, 'external_accounts', 'uid', {
      type: 'string',
      unique: true
    }),
    db.addColumn.bind(db, 'external_transactions', 'uid', {
      type: 'string',
      unique: true
    }),
    db.addColumn.bind(db, 'ripple_addresses', 'uid', {
      type: 'string',
      unique: true
    }),
    db.addColumn.bind(db, 'ripple_transactions', 'uid', {
      type: 'string',
      unique: true
    }),
  ], callback);
};

exports.down = function(db, callback) {

  async.series([
    db.removeColumn.bind(db, 'users', 'uid'),
    db.removeColumn.bind(db, 'external_accounts', 'uid'),
    db.removeColumn.bind(db, 'external_transactions', 'uid'),
    db.removeColumn.bind(db, 'ripple_addresses', 'uid'),
    db.removeColumn.bind(db, 'ripple_transactions', 'uid'),
  ], callback);

};

