exports.up = function(db, callback) {
  db.createTable('kyc_data', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },	 	
    name: { type: 'string', notNull: true },
    type: { type: 'string', notNull: true},
    user_id: { type: 'int', notNull: true},
    uid: { type: 'string'},
    createdAt: { type: 'datetime', notNull: true},
    updatedAt: { type: 'datetime', notNull: true},
	}, callback);
};

exports.down = function(db, callback) {
	db.dropTable('kyc_data', callback);
  callback();
};
