var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('configs', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    key: {
      type: 'string',
      notNull: true,
      unique: true
    },
    value: {
      type: 'string',
      notNull: true,
      unique: false
    },
    json: {
      type: 'boolean',
      default: false
    },
    createdAt: {
      type: 'datetime', notNull: true
    },
    updatedAt: {
      type: 'datetime'
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('configs', callback);
};
