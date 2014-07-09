exports.up = function(db, callback) {
  db.addColumn('ripple_transactions', 'state', {
    type: 'string',
    defaultValue: false
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('ripple_transactions', 'state', {
    type: 'string',
    defaultValue: false
  }, callback);
};

