var util = require("util");
var EventEmitter = require("events").EventEmitter;
var Client = require('ripple-rest-client');
var nconf = require('../config/nconf.js');

var client = new Client({
  api: 'http://localhost:5990/',
  account: nconf.get('gateway_cold_wallet'),
  secret: ''
});

var vent = new EventEmitter();

function pollForPayments(hash, fn) {

  client.getNotification(hash, function(err, notification) {
    if (err) {
      setTimeout(function(){
        fn(hash, pollForPayments);
      },500);
      return;
    }
    if (notification && notification.next_notification_hash) {
      client.getPayment(notification.next_notification_hash, function(err, payment) {
        if (err) { 
          setTimeout(function(){
            fn(hash, pollForPayments);
          },500);
        } else {
          vent.emit("payment", payment);
          nconf.set('last_payment_hash', payment.hash);
          nconf.save(function(){
            fn(notification.next_notification_hash, pollForPayments);
          });
        }
      });

    } else {
      setTimeout(function(){
        fn(hash, pollForPayments);
      },500);
    }
  });
}

function Listener() {};

util.inherits(Listener, EventEmitter);

Listener.prototype.start = function(hash) {
  var listener = this;
  vent.on('payment', function(payment) {
    //console.log(payment);
    listener.onPayment(payment);
  });
  pollForPayments(hash, pollForPayments);
};

module.exports = Listener;

