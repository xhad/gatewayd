var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.runSql('ALTER TABLE bank_transactions ADD CONSTRAINT userfk FOREIGN KEY ("bankAccountId") REFERENCES bank_accounts (id) MATCH FULL;', callback);
};

exports.down = function(db, callback) {
	db.runSql('ALTER TABLE bank_transactions DROP CONSTRAINT userfk',callback);
};
