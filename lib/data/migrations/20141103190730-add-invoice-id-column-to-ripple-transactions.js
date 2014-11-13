exports.up = function(db, callback) {
  db.addColumn('ripple_transactions', 'invoice_id', {
    type: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('ripple_transactions', 'invoice_id', {
    type: 'string'
  }, callback);
};

