var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('bridges', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    source_address_id: {
      type: 'int',
      notNull: true
    },
    destination_address_id: {
      type: 'int',
      notNull: true
    },
    direction: {
      type: 'string', // [to-ripple, from-ripple]
      notNull: true // may be removed in version 4
    },
    policy_id: {
      type: 'int',
      notNull: true
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
  db.dropTable('bridges', callback);
};

