var fixtures = require('./fixtures'),
		Payment = require('../payment'),
		assert = require('assert')
		
var transactions = {
	xrpToXrp: JSON.parse(fixtures['xrpToXrp']),
  IouToSameIou: JSON.parse(fixtures['IouToSameIou']),
  IouToXrp: JSON.parse(fixtures['IouToXrp'])
}

var payment = new Payment(fixtures['xrpToXrp']);
console.log(payment.toJSON());

assert.equal(payment.toCurrency, 'XRP');
assert.equal(payment.fromCurrency, 'XRP');

/* ---------- */

var payment = new Payment(fixtures['IouToXrp']);
payment = payment.toJSON();

assert.equal(payment.toCurrency, 'XRP');
assert.equal(payment.fromCurrency, 'EUR');

/* ---------- */

var payment = new Payment(fixtures['IouToSameIou']);
payment = payment.toJSON();

assert.equal(payment.toCurrency, 'XAG');
assert.equal(payment.fromCurrency, 'XAG');

