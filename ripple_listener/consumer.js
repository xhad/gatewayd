/* Requires ENV configuration

export RIPPLE_ADDRESS

*/
var zmq = require('zmq');

var consumer = zmq.socket('pull');
var Payment = require('./payment');

var account = process.env.RIPPLE_ADDRESS;
console.log('listening for transactions on ', account);

function Transaction(data) {
  this.data = JSON.parse(data);
}

consumer.on('message', function(message) {
	transaction = JSON.parse(message.toString());
	console.log(message.toString());

	console.log('status', transaction.engine_result);
	console.log('from address', transaction.transaction.Account);
	console.log('to address', transaction.transaction.Destination);

	console.log('destination tag', transaction.transaction.DestinationTag);
	console.log('transaction hash', transaction.transaction.hash);
	console.log('transaction state', transaction.engine_result);
	console.log('transaction is validated', transaction.validated);

	try {
		var payment = new Payment(message);
		//console.log(payment.toJSON());
	} catch(e) {
		console.log(e);
	}
	
  // all outgoing transactions should have a destination tag
	// that can be used to look up the ripple transcation in
  // the database

  // Incoming transactions might not have a destination tag
  // But their user account should be looked up in the database
  // based on the sender ripple address
	
	/* needs to post to the webserver with the following fields:
		- txState
		- txHash
		- toAddress
		- fromAddress
		- destinationTag
		- toCurrency
		- fromCurrency
		- toAmount
		- fromAmount
	*/
});

consumer.connect('tcp://127.0.0.1:5252');
