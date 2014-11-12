process.env.NODE_ENV = 'test_in_memory';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var RippleTransactions = require(__dirname+'/../../').data.models.rippleTransactions;

describe('RippleTransactions ', function() {

  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    RippleTransactions.initModel(true).then(function() {
      done();
    });
  });

  it('should successfully persist a ripple_transaction record', function() {
    return RippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 5,
      to_currency: 'USD',
      to_issuer: 'r12345',
      from_amount: 6,
      from_currency: 'USD',
      from_issuer: 'r67890',
      direction: 'to-ripple'
    }).then(function(transaction) {
        chai.assert.strictEqual(transaction.to_address_id, 1);
        chai.assert.strictEqual(transaction.from_address_id, 2);
        chai.assert.strictEqual(transaction.to_amount, 5);
        chai.assert.strictEqual(transaction.to_currency, 'USD');
        chai.assert.strictEqual(transaction.to_issuer, 'r12345');
        chai.assert.strictEqual(transaction.from_amount, 6);
        chai.assert.strictEqual(transaction.from_currency, 'USD');
        chai.assert.strictEqual(transaction.from_issuer, 'r67890');
        chai.assert.strictEqual(transaction.direction, 'to-ripple');
    }).error(function(error) {
        throw new Error(JSON.stringify(error));
    })
  });

  it('should successfully persist a ripple_transaction record with memo and invoice_id fields', function() {
    return RippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 5,
      to_currency: 'USD',
      to_issuer: 'r12345',
      from_amount: 6,
      from_currency: 'USD',
      from_issuer: 'r67890',
      invoice_id: '03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4',
      memos: [{ MemoData: '7274312E302E3132', MemoType: '636C69656E74' }]
    }).then(function(transaction) {
        chai.assert.strictEqual(transaction.to_address_id, 1);
        chai.assert.strictEqual(transaction.from_address_id, 2);
        chai.assert.strictEqual(transaction.to_amount, 5);
        chai.assert.strictEqual(transaction.to_currency, 'USD');
        chai.assert.strictEqual(transaction.to_issuer, 'r12345');
        chai.assert.strictEqual(transaction.from_amount, 6);
        chai.assert.strictEqual(transaction.from_currency, 'USD');
        chai.assert.strictEqual(transaction.from_issuer, 'r67890');
        chai.assert.strictEqual(transaction.invoice_id, '03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4');
        chai.assert.deepEqual(transaction.memos, [{ MemoData: '7274312E302E3132', MemoType: '636C69656E74' }]);
    }).error(function(error) {
        throw new Error(JSON.stringify(error));
    })
  });

  it('create should be rejected if to_address_id is missing', function() {
    return chai.assert.isRejected(RippleTransactions.create({
      //to_address_id: 1,
      from_address_id: 2,
      to_amount: 5,
      to_currency: 'USD',
      to_issuer: 'r12345',
      from_amount: 6,
      from_currency: 'USD',
      from_issuer: 'r67890'
    }, {
      to_address_id: [ 'Validation notNull failed: to_address_id' ]
    }))
  });

  it('create should be rejected if from_address_id is missing', function() {
    return chai.assert.isRejected(RippleTransactions.create({
      to_address_id: 1,
      //from_address_id: 2,
      to_amount: 5,
      to_currency: 'USD',
      to_issuer: 'r12345',
      from_amount: 6,
      from_currency: 'USD',
      from_issuer: 'r67890'
    }, {
      to_address_id: [ 'Validation notNull failed: from_address_id' ]
    }))
  });

  it('create should be rejected if to_amount is missing', function() {
    return chai.assert.isRejected(RippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      //to_amount: 5,
      to_currency: 'USD',
      to_issuer: 'r12345',
      from_amount: 6,
      from_currency: 'USD',
      from_issuer: 'r67890'
    }, {
      to_address_id: [ 'Validation notNull failed: to_amount' ]
    }))
  });

  it('create should be rejected if to_currency is missing', function() {
    return chai.assert.isRejected(RippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 5,
      //to_currency: 'USD',
      to_issuer: 'r12345',
      from_amount: 6,
      from_currency: 'USD',
      from_issuer: 'r67890'
    }, {
      to_address_id: [ 'Validation notNull failed: to_currency' ]
    }))
  });

  it('create should be rejected if to_issuer is missing', function() {
    return chai.assert.isRejected(RippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 5,
      to_currency: 'USD',
      //to_issuer: 'r12345',
      from_amount: 6,
      from_currency: 'USD',
      from_issuer: 'r67890'
    }, {
      to_address_id: [ 'Validation notNull failed: to_issuer' ]
    }))
  });

  it('create should be rejected if from_amount is missing', function() {
    return chai.assert.isRejected(RippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 5,
      to_currency: 'USD',
      to_issuer: 'r12345',
      //from_amount: 6,
      from_currency: 'USD',
      from_issuer: 'r67890'
    }, {
      to_address_id: [ 'Validation notNull failed: from_amount' ]
    }))
  });

  it('create should be rejected if from_currency is missing', function() {
    return chai.assert.isRejected(RippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 5,
      to_currency: 'USD',
      to_issuer: 'r12345',
      from_amount: 6,
      //from_currency: 'USD',
      from_issuer: 'r67890'
    }, {
      to_address_id: [ 'Validation notNull failed: from_currency' ]
    }))
  });

  it('create should be rejected if direction is invalid', function() {
    return chai.assert.isRejected(RippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 5,
      to_currency: 'USD',
      to_issuer: 'r12345',
      from_amount: 6,
      from_currency: 'USD',
      from_issuer: 'r67890',
      direction: 'up-and-up'
    }, {
      direction: [ 'Validation isIn failed: direction' ]
    }));
  });

  it('create should be rejected if from_issuer is missing', function() {
    return chai.assert.isRejected(RippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 5,
      to_currency: 'USD',
      to_issuer: 'r12345',
      from_amount: 6,
      from_currency: 'USD'
      //from_issuer: 'r67890'
    }, {
      to_address_id: [ 'Validation notNull failed: from_issuer' ]
    }))
  });

  it('create should be rejected if invoice_id is not a valid SHA-256 hash', function() {
    return chai.assert.isRejected(RippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 5,
      to_currency: 'USD',
      to_issuer: 'r12345',
      from_amount: 6,
      from_currency: 'USD',
      from_issuer: 'r67890',
      invoice_id: '12323'
    }, {
      invoice_id: [ 'Must be a valid SHA-256 hash' ]
    }));
  });
});
