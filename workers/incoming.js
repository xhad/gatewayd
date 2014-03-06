var Ripple = require('ripple-lib')
var request = require('request')
var nconf = require('../config/nconf.js');

var client = new RippleSimpleClient({
  apiUrl: nconf.get('RIPPLE_REST_API')
});

// Proposed!!
/*
client.listener.on('payment:inbound', function(payment) {
  // create a new ripple transaction
});

client.listener.on('payment:outbound', function(payment) {
  // update an existing ripple transaction
});

client.listener.start();

*/
