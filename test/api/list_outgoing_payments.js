process.env.NODE_ENV = 'test_in_memory';
const gatewayd = require(__dirname+'/../../');

var chai = require('chai');
var listOutgoingPayments = require(__dirname+'/../../lib/api/list_outgoing_payments.js');

describe('list_outgoing_payments', function() {

  beforeEach(function (done) {
    gatewayd.database.sync({force: true}).then(function () {
      done();
    });
  });

  it('should successfully return a list of 2 outgoing rippleTransactions with addresses corresponding to the persisted rippleAddress records', function (done) {
    // create toAddress
    gatewayd.models.rippleAddresses.create({
      managed: true,
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      type: 'cold'
    }).then(function (toAddress) {
      // create fromAddress
      gatewayd.models.rippleAddresses.create({
        managed: true,
        address: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr',
        type: 'hot'
      }).then(function (fromAddress) {
        gatewayd.models.rippleTransactions.bulkCreate([
          {
            to_address_id: toAddress.id,
            from_address_id: fromAddress.id,
            to_amount: 5.00,
            to_currency: 'USD',
            from_amount: 5.00,
            from_currency: 'USD',
            state: 'outgoing'
          },
          {
            to_address_id: toAddress.id,
            from_address_id: fromAddress.id,
            to_amount: 6.00,
            to_currency: 'USD',
            from_amount: 6.00,
            from_currency: 'USD',
            state: 'outgoing'
          }
        ]).then(function () {
          listOutgoingPayments(function (error, rippleTransactions) {
            chai.assert.strictEqual(rippleTransactions.length, 2);
            for (var i = 0; i < rippleTransactions.length; i++) {
              chai.assert.strictEqual(rippleTransactions[i].toAddress.address, 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk');
              chai.assert.strictEqual(rippleTransactions[i].fromAddress.address, 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr');
              chai.assert.strictEqual(rippleTransactions[i].state, 'outgoing');
            }
            done();
          })
        })
      })
    })
  });

  it('should successfully return a list of length 0', function (done) {
    listOutgoingPayments(function (error, rippleTransactions) {
      chai.assert.strictEqual(rippleTransactions.length, 0);
      done();
    })
  });
});
