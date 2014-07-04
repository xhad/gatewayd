exports.up = function(db, callback) {
  db.addColumn('ripple_transactions', 'external_transaction_id', {
    type: 'integer'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('ripple_transactions', 'external_transaction_id', {
    type: 'integer'
  }, callback);
};

