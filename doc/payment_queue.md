## Simple Payment Queue

The gateway application in order to have a standard
interface for robustly creating transactions will
delegate outgoing payments to a Redis queue. A redis
queue is satisfies the requirements that queue can
be persisted to the file system, and enables pub/sub
messaging architectures in addition to lists/queues.

		var redis = require('redis');

    queue = new PaymentQueue({
			redis: redis
 		});

		payment = {}; // Simple payment object
		queue.push(payment);
		queue.read(function(payments){
			assert.equal(payments[0], payment);
		});

		queue.on('payment', function(payment) {
	    // receive successful payment notifications
		});

		queue.processTransactions();

The PaymentQueue interface allows for pushing and 
listening. Behind the interface the "Robust Transactions
Submission" takes place.
		
