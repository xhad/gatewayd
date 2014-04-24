var gateway = require(__dirname+'/../../');
var EventEmitter = require("events").EventEmitter;
var util = require('util');

var queue = new EventEmitter; 

function pollIncoming(fn) {
  gateway.api.listIncomingPayments(function(err, payments) {
    if (err) {
      console.log('error:', err);
    } else {
      if (payments[0]) {
        queue.emit('payment:withdrawal', payments[0]);
      } 
    }
    setTimeout(function() {
      fn(pollIncoming);
    },500);
  });
}

queue.work = function() {
  pollIncoming(pollIncoming);
}

module.exports = queue;

