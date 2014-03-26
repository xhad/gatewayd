var trust = require('../lib/trust.js');
var nconf = require('../config/nconf.js');

var args = process.arv;

trust({ 
  currency: "XAU", 
  amount: 1, 
  issuer: nconf.get('gateway_cold_wallet'), 
  account: nconf.get('gateway_hot_wallet').address,
  secret: nconf.get('gateway_hot_wallet').secret
}, 
  console.log
);
