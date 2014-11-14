var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.changeColumn('ripple_transactions', 'to_issuer', {
    type: 'string',
    notNull: false
  }, function() {
    db.changeColumn('ripple_transactions', 'from_issuer', {
      type: 'string',
      notNull: false
    }, callback);
  });
};

exports.down = function(db, callback) {
  db.changeColumn('ripple_transactions', 'to_issuer', {
      type: 'string',
      notNull: true
  }, function() {
    db.changeColumn('ripple_transactions', 'to_issuer', {
      type: 'string',
      notNull: true
    });
  }, callback);
};

