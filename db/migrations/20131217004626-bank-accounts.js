var dbm = require('db-migrate')
var type = dbm.dataType

exports.up = function(db, callback) {
  db.createTable('accounts', { 
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    userId: { type: 'int', unique: true, notNull: true },
    createdAt: { type: 'datetime', notNull: true },
    updatedAt: { type: 'datetime', unique: true, notNull: true }
  }, callback)
}

exports.down = function(db, callback) {
  db.dropTable('accounts', callback)
};
