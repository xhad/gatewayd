var util = require("util");
var EventEmitter = require("events").EventEmitter;
var Client = require('ripple-rest-client');
var gateway = require('../');

var client = new Client({
  api: 'http://localhost:5990/',
  account: gateway.config.get('gateway_cold_wallet'),
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
          gateway.config.set('last_payment_hash', payment.hash);
          gateway.config.save(function(){
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
    listener.onPayment(payment);
  });
  pollForPayments(hash, pollForPayments);
};

module.exports = Listener;

