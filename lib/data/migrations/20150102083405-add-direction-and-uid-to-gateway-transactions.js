var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('gateway_transactions', 'direction', {
    type: 'string'
  }, function() {
    db.addColumn('gateway_transactions', 'uid', {
      type: 'string'
    }, callback);
  });
};

exports.down = function(db, callback) {
  db.removeColumn('gateway_transactions', 'direction', function() { 
    db.removeColumn('gateway_transactions', 'uid', callback);
  });
};
