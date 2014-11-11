var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {

  db.addColumn('external_transactions', 'invoice_id', {
    type: 'string'  
  }, callback);

};

exports.down = function(db, callback) {
  
  db.removeColumn('external_transactions', 'invoice_id', callback);

};
