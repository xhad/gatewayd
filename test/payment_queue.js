var PaymentQueue = require("../lib/payment_queue.js");
var assert = require("assert");
var sinon = require("sinon");

describe('PaymentQueue', function(){
	it('should throw error without redis object upon initialization', function(){
		try {
			var queue = new PaymentQueue();
			assert(false);
		} catch(e) {
			assert(true);
		}
	});

	it('should be valid with a redis object upon initialization', function(){
		try {
			var redis = { createClient: function(){}}
			var queue = new PaymentQueue({
				redis: redis
			})
			assert(true);
		} catch(e) {
			assert(false);
		}
	});

	it('should create a redis client upon initialization', function(){
		redis = {};
		redis.createClient = sinon.spy();
		queue = new PaymentQueue({ redis: redis });
		assert(redis.createClient.called);
	});

	it('should set the redis property to the redis client instance', function(){
		redis = {};
		client = 'someclientobject';
		var redis = { createClient: function(){ return client } };
		queue = new PaymentQueue({ redis: redis });
		assert.equal(client, queue.redis);
	});

	it('should add new payments to the bottom of the queue', function(){
		var redis = { createClient: function(){ return {} } };
		queue = new PaymentQueue({ redis: redis });	
		queue.redis.rpush = sinon.spy();
		queue.sendPayment({});
	  assert(queue.redis.rpush.calledOnce);	
	});

	it('should read the list of payments from top to bottom', function(){
		var redis = { createClient: function(){ return { 
			lrange: sinon.spy()
		}}};
		var queue = new PaymentQueue({ redis: redis });	
		var callback = function(){};
		queue.read(callback);
		assert(queue.redis.lrange.calledWith(0,-1,callback));
	});

	it('should by default not be processing payments', function(){
		var redis = { createClient: function(){ return {} } };
		queue = new PaymentQueue({ redis: redis });	
		assert.equal(queue.processing, false);
	});

	it('should expose the ability to start processing payments', function(){
		var redis = { createClient: function(){ return {} } };
		queue = new PaymentQueue({ redis: redis });	
		queue.processPayments();
		assert.equal(queue.processing, true);
	});

	it('should expose the ability to stop processing payments', function(){
		var redis = { createClient: function(){ return {} } };
		queue = new PaymentQueue({ redis: redis });	
		queue.processPayments();
		assert.equal(queue.processing, true);
		queue.stopProcessingPayments();
		assert.equal(queue.processing, false);
	});

	it('should allow subscriptions to payments', function(){
		var redis = { createClient: function(){ return {} } };
		queue = new PaymentQueue({ redis: redis });	
	});
});
