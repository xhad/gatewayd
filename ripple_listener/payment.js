var gatewayHotWalletAddress = "rpL9vgUH7NBphD5H3FFqLQDhbtzEELS88n";

function Ledger(hash, index) {
  this.hash = hash;
	this.index = index;
	this.transactions = [];
}

function Payment(message) {
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
		this.data.Currency = 'XRP';
	} else {
		var amount = this.get('Amount');
		this.data.Amount = amount.value;
		this.data.Currency = amount.currency;
		this.data.Issuer = amount.issuer;
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
