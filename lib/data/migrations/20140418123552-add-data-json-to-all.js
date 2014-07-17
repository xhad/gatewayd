var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.addColumn.bind(db, 'external_accounts', 'data', {
      type: 'text'
    }),
    db.addColumn.bind(db, 'external_transactions', 'data', {
      type: 'text'
    }),
    db.addColumn.bind(db, 'ripple_addresses', 'data', {
      type: 'text'
    }),
    db.addColumn.bind(db, 'ripple_transactions', 'data', {
      type: 'text'
    }),
  ], callback);
};

exports.down = function(db, callback) {

  async.series([
    db.removeColumn.bind(db, 'external_accounts', 'data'),
    db.removeColumn.bind(db, 'external_transactions', 'data'),
    db.removeColumn.bind(db, 'ripple_addresses', 'data'),
    db.removeColumn.bind(db, 'ripple_transactions', 'data'),
  ], callback);

};

