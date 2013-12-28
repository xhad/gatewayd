var gatewayHotWalletAddress = "rpL9vgUH7NBphD5H3FFqLQDhbtzEELS88n";

function Ledger(hash, index) {
  this.hash = hash;
	this.index = index;
	this.transactions = [];
}

function Payment(msg) {
	
	var message = JSON.parse(msg);
	console.log(message);
	this.data = message.transaction;
  this.result = message.engine_result;
	this.validated = message.validated;

	this.ledger = new Ledger(message);
	this.ledger.transactions.push(this);

	if (this.result != 'tesSUCCESS') {
		throw new Error("Result not tesSUCCESS");
	}

	if (!this.validated) {
		throw new Error("Payment not validated");
	}

  if (this.data.TransactionType != 'Payment') { 
		throw new Error("Payment not a payment");
	}

	if (this.isIOU()) {
		this.toCurrency = 'XRP';
		this.toAmount = this.data.Amount;
		this.fromCurrency = 'XRP';
		this.fromAmount = this.data.Amount;
	} else {
		var amount = this.data.Amount;
		this.toAmount = amount.Value;
		this.toCurrency = amount.Currency;
		this.fromAmount = null;
		this.fromCurrency = null;
		this.destinationTag = this.data.DestinationTag;
		this.issuer = amount.Issuer;
	} 
}

function IncomingPayment(message, rippleAddress) {
  Payment.call(this, message);

	if (message.transaction.account == rippleAddress) {
		throw new Error("Payment is an Issuance from " + rippleAddress);
	}
}

function OutgoingPayment(message, rippleAddress) {
  Payment.call(this, message);

	if (!rippleAddress) { 
		throw new Error("Invalid rippleAddress");
	}

	if (message.transaction.account != rippleAddress) {
		throw new Error("Payment is incoming to " + rippleAddress);
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

Payment.prototype.get = function(attribute) {
  this.data[attribute];
}

Payment.prototype.isIOU = function() {
	var currency = this.get('Currency');
	if (!!currency) {
	  if (currency == 'XRP') {
			return false
		} else {
			return true	
		} 
	} else {
		return false
	}
}

Payment.prototype.isIssuanceOf = function(rippleAddress) {
	if (!this.isIOU) { return false };
	rippleAddress == this.get('account');
}

module.exports = Payment;
