require('./logs.js');

var requireAll = require('require-all-to-camel');
var users                 = require('./controllers/users');
var externalAccounts      = require('./controllers/external_accounts');
var externalTransactions  = require('./controllers/external_transactions');
var rippleAddresses       = require('./controllers/ripple_addresses');
var rippleTransactions    = require('./controllers/ripple_transactions');

var API = function() {
  // optionally instantiate some shared variable
};

// create instance of the API
var instance = new API();

// decorate the api instance by controller on the defined property
// e.g. the user controller will decorate the instance on the 'users' property
// -> api.users.creat
var bind = function(controller, property) {
	instance[property] = {};
	controller(instance[property]);
};

bind(externalAccounts, 'externalAccounts');
bind(externalTransactions, 'externalTransactions');
bind(rippleAddresses, 'rippleAddresses');
bind(rippleTransactions, 'rippleTransactions');
bind(users, 'users');

instance.models = requireAll(__dirname+'/models');

// export a singleton
// module.exports caches it's value, which is the api instance in our case
module.exports = instance;

