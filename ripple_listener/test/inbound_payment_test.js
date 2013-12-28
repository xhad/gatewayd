var fixtures = require('./fixtures'),
		Payment = require('../payment'),
		assert = require('assert')
		
var transactions = {
	xrpToXrp: JSON.parse(fixtures['xrpToXrp']),
  IouToSameIou: JSON.parse(fixtures['IouToSameIou']),
  IouToXrp: JSON.parse(fixtures['IouToXrp'])
}

var payment = new Payment(fixtures['xrpToXrp']);

assert.equal(payment.toCurrency, 'XRP');
assert.equal(payment.fromCurrency, 'XRP');
assert.equal(payment.toAmount, 10);
assert.equal(payment.fromAmount, 10);

/* ---------- */

var payment = new Payment(fixtures['IouToXrp']);
console.log(payment.toJSON());

assert.equal(payment.toCurrency, 'XRP');
assert.equal(payment.fromCurrency, 'EUR');
assert.equal(payment.toAmount, 100);
assert.equal(payment.fromAmount, 0.2226444);
assert.equal(payment.toAddress, 'rpL9vgUH7NBphD5H3FFqLQDhbtzEELS88n');
assert.equal(payment.fromAddress, 'rHKueQebtVU9cEamhBbMV8AEViqKjXcBcB');
assert.equal(payment.txState, 'tesSUCCESS');
assert.equal(payment.txHash, '238235BE2DDA2F3E044000B7C96CE2ED6703CC0410878E21500E1F87C925C562');

/* ---------- */

var payment = new Payment(fixtures['IouToSameIou']);
payment = payment.toJSON();

assert.equal(payment.toCurrency, 'XAG');
assert.equal(payment.fromCurrency, 'XAG');
assert.equal(payment.toAmount, 1);
assert.equal(payment.fromAmount, 1.01);

