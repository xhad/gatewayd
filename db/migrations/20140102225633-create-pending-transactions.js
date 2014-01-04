var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('pending_ripple_transactions', {
		id: { type: 'int', primaryKey: true, autoIncrement: true },
		rippleTransactionId: { type: 'int', notNull: true, unique: true },
		initialStatus: { type: 'string', notNull: true},
		createdAt: { type: 'datetime', notNull: true },
		updatedAt: { type: 'datetime' }
	}, callback);

};

exports.down = function(db, callback) {
	db.dropTable('pending_ripple_transactions', callback);
};
