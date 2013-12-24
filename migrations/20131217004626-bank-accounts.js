var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('bank_accounts', { 
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    userId: { type: 'int', unique: true, notNull: true },
    createdAt: { type: 'datetime', notNull: true },
    updatedAt: { type: 'datetime', unique: true, notNull: true }
  }, function(){
		db.runSql('ALTER TABLE bank_accounts ADD CONSTRAINT userfk FOREIGN KEY ("userId") REFERENCES users (id) MATCH FULL;', callback);
	});


}

exports.down = function(db, callback) {
  db.dropTable('bank_accounts', callback);
};
