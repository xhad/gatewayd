var gatewayHotWalletAddress = "rpL9vgUH7NBphD5H3FFqLQDhbtzEELS88n";

function Ledger(hash, index) {
  this.hash = hash;
	this.index = index;
	this.transactions = [];
}

function Payment(msg) {
	var message = JSON.parse(msg);
  this.result = message.engine_result;
	this.validated = message.validated;

	if ((typeof message.transaction.Amount) == 'string') {
		this.toAmount = message.transaction.Amount;
		this.toCurrency = 'XRP';
	} else {
		this.toAmount = message.transaction.Amount.value;
		this.toCurrency = message.transaction.Amount.currency;
	}

	if (!!message.transaction.SendMax) {
		this.fromAmount = message.transaction.SendMax.value;
		this.fromCurrency = message.transaction.SendMax.currency;
	} else {
		this.fromAmount = message.transaction.Amount;
		this.fromCurrency = 'XRP';
	}

	if (this.result != 'tesSUCCESS') {
		throw new Error("Result not tesSUCCESS");
	}

	if (!this.validated) {
		throw new Error("Payment not validated");
	}
}

Payment.prototype.toJSON = function() {
  return {
		validated: this.validated,
		transactionHash: this.transactionHash,
		tranasctionStatus: this.transactoinStatus,
	  toCurrency: this.toCurrency,	
		fromCurrency: this.fromCurrency,
		toAmount: this.toAmount,
		fromAmount: this.fromAmount,
		destinationTag: this.destinationTag
	}
}

Payment.parseFromMessage = function(message) {
  if (!message.validated) { return false }
  if (message.engine_result != 'tesSUCCESS') { return false }
  if (message.transaction.PaymentType != 'Payment') { return false }
	return new Payment(message);
}

module.exports = Payment;
