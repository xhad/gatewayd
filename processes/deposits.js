var queue = require('../lib/deposit_queue.js');

var config = require('../config/nconf.js');
var abstract = require('../lib/abstract.js');
var api = require("ripple-gateway-data-sequelize-adapter");
var sql = require('../node_modules/ripple-gateway-data-sequelize-adapter/lib/sequelize.js');
var gateway = require('../lib/gateway.js');

queue.on('deposit', function(deposit) {

  console.log('read a deposit from the queue');
  console.log(deposit.toJSON());

});

queue.work();

console.log('Pulling deposits from the queue for processing');

