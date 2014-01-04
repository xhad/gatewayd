var PendingRippleTransaction = require("../models/pending_ripple_transaction");

module.exports = (function(){
	function create(req, res) {
		PendingRippleTransaction.create();
		res();
	}

	return {
		create: create
	}
})();
