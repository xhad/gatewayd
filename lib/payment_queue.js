var check = require("validator").check;
var events = require('events');

function PaymentQueue(options) {
	check(options.redis).notNull;
	this.redis = options.redis.createClient();
	this.callbackQueue = options.callbackQueue;
	this.processing = false;
}

PaymentQueue.prototype.__proto__ = events.EventEmitter.prototype;

PaymentQueue.prototype.sendPayment = function(simplePaymentObject, cb) {
	this.redis.rpush(simplePaymentObject, cb);
}

PaymentQueue.prototype.read = function(callback){
  this.redis.lrange(0,-1,callback);	
}

PaymentQueue.prototype.processPayments = function(){
	this.processing = true;
}

PaymentQueue.prototype.stopProcessingPayments = function(){  
	this.processing = false;
}

module.exports = PaymentQueue;
