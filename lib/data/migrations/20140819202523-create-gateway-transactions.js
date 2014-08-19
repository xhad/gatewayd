var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('gateway_transactions', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },   
    external_transaction_id: {
      type: 'int',
      notNull: true
    },
    ripple_transaction_id: {
      type: 'int',
      notNull: true
    },
    policy_id: {
      type: 'int',
      notNull: true
    },
    state: {
      type: 'string'
    },
    createdAt: {
      type: 'datetime',
      notNull: true
    },
    updatedAt: {
      type: 'datetime',
      notNull: true
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('gateway_transactions', callback);
  callback();
};
