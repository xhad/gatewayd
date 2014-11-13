exports.up = function(db, callback) {
  db.addColumn('ripple_transactions', 'memos', {
    type: 'text',
    defaultValue: false
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('ripple_transactions', 'memos', {
    type: 'text',
    defaultValue: false
  }, callback);
};

