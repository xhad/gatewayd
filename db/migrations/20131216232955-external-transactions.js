var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('external_transactions', { 
		id: { type: 'int', primaryKey: true, autoIncrement: true },
    deposit: { type: 'boolean', notNull: true },
    currency: { type: 'string', notNull: true },
    cash_amount: { type: 'decimal', notNull: true },
    external_account_id: { type: 'int', notNull: true },
    ripple_transaction_id: { type: 'int'},
    createdAt: { type: 'datetime', notNull: true },
    updatedAt: { type: 'datetime' }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('external_transactions', callback);
};
