var crypto = require('crypto');

exports.rand = function() { return crypto.randomBytes(32).toString('hex'); }


