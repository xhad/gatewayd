var express = require('express');
var childProcess = require('child_process');
var middleware = require('./config/initializers/middleware.js');
var router = require('./config/routes.js');
var host = process.env.HOST;
var port = process.env.PORT || 4000;
var app = express();

middleware.configure(app);
router.route(app);

host ? app.listen(port, host) : app.listen(port);

var paymentApi = childProcess.spawn("node", ["ripple-simple/app.js"]); 

paymentApi.stdout.on('data', function(data) {
  console.log(data.toString());
});
paymentApi.stderr.on('data', function(data) {
  console.log(data.toString());
});

setTimeout(function(){
  var outgoingPaymentsMonitor = childProcess.spawn("node", ["workers/outgoing_ripple_payments.js"]);
  outgoingPaymentsMonitor.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  outgoingPaymentsMonitor.stderr.on('data', function(data) {
    console.log(data.toString());
  });
},10000);

console.log('Serving HTTP on', (host || 'localhost')+":"+port);

