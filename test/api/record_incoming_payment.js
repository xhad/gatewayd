process.env.NODE_ENV = 'test_in_memory';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var config = require(__dirname+'/../../config/environment.js');
var recordIncomingPayment = require(__dirname+'/../../lib/api/record_incoming_payment.js');
var Promise = require('bluebird');
var RippleTransaction = require(__dirname+'/../../').data.models.rippleTransactions;
var RippleAddress = require(__dirname+'/../../').data.models.rippleAddresses;

describe('record_incoming_payments ', function() {

  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    Promise.all([RippleTransaction.initModel(true), RippleAddress.initModel(true)]).then(function() {
      done();
    })
  });

  it('should successfully persist a ripple_transaction for an incoming payment', function() {
    return recordIncomingPayment({
      destination_tag: 123,
      destination_amount: {
        value: 5,
        currency: 'USD',
        issuer: 'r123'
      },
      source_account: 'r12345678901234567890123',
      source_amount: {
        value: 6,
        currency: 'EUR',
        issuer: 'r456'
      },
      transaction_state: 'tesSUCCESS',
      state: 'incoming',
      transaction_hash: '45154213',
      invoice_id: 'invoice123',
      memos: [{ MemoData: '7274312E302E3132', MemoType: '636C69656E74' }]
    }).then(function(rippleTransaction) {
      chai.assert.strictEqual(rippleTransaction.to_amount, 5);
      chai.assert.strictEqual(rippleTransaction.to_currency, 'USD');
      chai.assert.strictEqual(rippleTransaction.to_issuer, config.get('COLD_WALLET'));
      chai.assert.strictEqual(rippleTransaction.from_amount, 6);
      chai.assert.strictEqual(rippleTransaction.from_currency, 'EUR');
      chai.assert.strictEqual(rippleTransaction.from_issuer, 'r456');
      chai.assert.strictEqual(rippleTransaction.transaction_state, 'tesSUCCESS');
      chai.assert.strictEqual(rippleTransaction.invoice_id, 'invoice123');
      chai.assert.deepEqual(rippleTransaction.memos, [{ MemoData: '7274312E302E3132', MemoType: '636C69656E74' }]);
    }).error(function(error) {
      throw new Error(JSON.stringify(error));
    })
  });

  it('should successfully persist a ripple_address for the destination for an incoming payment', function() {
    return recordIncomingPayment({
      destination_tag: 123,
      destination_amount: {
        value: 5,
        currency: 'USD',
        issuer: 'r123'
      },
      source_account: 'r12345678901234567890123',
      source_amount: {
        value: 6,
        currency: 'EUR',
        issuer: 'r456'
      },
      transaction_state: 'tesSUCCESS',
      state: 'incoming',
      transaction_hash: '45154213',
      invoice_id: 'invoice123',
      memos: [{ MemoData: '7274312E302E3132', MemoType: '636C69656E74' }]
    }).then(function(rippleTransaction) {
      RippleAddress.find({
        where: {id: rippleTransaction.from_address_id}
      }).then(function(rippleAddress) {
        chai.assert.strictEqual(rippleAddress.address, 'r12345678901234567890123');
        chai.assert.false(rippleAddress.tag);
        chai.assert.false(rippleAddress.managed);
        chai.assert.strictEqual(rippleAddress.type, 'independent');
      }).error(function(error) {
        throw new Error(JSON.stringify(error));
      })
    }).error(function(error) {
      throw new Error(JSON.stringify(error));
    })
  });

  it('should successfully persist a ripple_address for the source for an incoming payment', function() {
    return recordIncomingPayment({
      destination_tag: 123,
      destination_amount: {
        value: 5,
        currency: 'USD',
        issuer: 'r123'
      },
      source_account: 'r12345678901234567890123',
      source_amount: {
        value: 6,
        currency: 'EUR',
        issuer: 'r456'
      },
      transaction_state: 'tesSUCCESS',
      state: 'incoming',
      transaction_hash: '45154213',
      invoice_id: 'invoice123',
      memos: [{ MemoData: '7274312E302E3132', MemoType: '636C69656E74' }]
    }).then(function(rippleTransaction) {
      RippleAddress.find({
        where: {id: rippleTransaction.to_address_id}
      }).then(function(rippleAddress) {
        chai.assert.strictEqual(rippleAddress.tag, '123');
        chai.assert.strictEqual(rippleAddress.address, config.get('COLD_WALLET'));
        chai.assert(rippleAddress.managed);
        chai.assert.strictEqual(rippleAddress.type, 'hosted');
      }).error(function(error) {
        throw new Error(JSON.stringify(error));
      })
    }).error(function(error) {
      throw new Error(JSON.stringify(error));
    })
  });

  it('should fail when destination_tag is not a valid int', function() {
    return chai.assert.isRejected(recordIncomingPayment({
      destination_tag: 'a123',
      destination_amount: {
        value: 5,
        currency: 'USD',
        issuer: 'r123'
      },
      source_account: 'r12345678901234567890123',
      source_amount: {
        value: 6,
        currency: 'EUR',
        issuer: 'r456'
      },
      transaction_state: 'tesSUCCESS',
      state: 'incoming',
      transaction_hash: '45154213',
      invoice_id: 'invoice123',
      memos: [{ MemoData: '7274312E302E3132', MemoType: '636C69656E74' }]
    }), {tag: ['Validation isInt failed: tag']});
  });

  it('should fail when destination_tag is not a valid int', function() {
    return chai.assert.isRejected(recordIncomingPayment({
      destination_tag: 123,
      destination_amount: {
        currency: 'USD',
        issuer: 'r123'
      },
      source_account: 'r12345678901234567890123',
      source_amount: {
        value: 6,
        currency: 'EUR',
        issuer: 'r456'
      },
      transaction_state: 'tesSUCCESS',
      state: 'incoming',
      transaction_hash: '45154213',
      invoice_id: 'invoice123',
      memos: [{ MemoData: '7274312E302E3132', MemoType: '636C69656E74' }]
    }), {"to_amount":["Validation notNull failed: to_amount","Validation isDecimal failed: to_amount"]});
  });
});
