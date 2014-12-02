var gatewayd = require(__dirname+'/../../');
var chai = require('chai');

describe('List Failed Payments', function(){

  beforeEach(function (done) {
    gatewayd.database.sync({force: true}).then(function () {
      done();
    });
  });

  it('should return payments in the "failed" state', function(done){
    gatewayd.models.rippleTransactions.bulkCreate([
      {
        to_address_id: 1,
        from_address_id: 2,
        to_amount: 5.00,
        to_currency: 'USD',
        from_amount: 5.00,
        from_currency: 'USD',
        state: 'failed'
      },
      {
        to_address_id: 1,
        from_address_id: 2,
        to_amount: 6.00,
        to_currency: 'USD',
        from_amount: 6.00,
        from_currency: 'USD',
        state: 'failed'
      }
    ]).then(function () {
      gatewayd.api.listFailedPayments(function (error, rippleTransactions) {
        chai.assert.strictEqual(rippleTransactions.length, 2);
        for (var i = 0; i < rippleTransactions.length; i++) {
          chai.assert.strictEqual(rippleTransactions[i].state, 'failed');
          chai.assert.strictEqual(rippleTransactions[i].to_address_id, 1);
          chai.assert.strictEqual(rippleTransactions[i].from_address_id, 2);
          chai.assert.strictEqual(rippleTransactions[i].to_currency, 'USD');
          chai.assert.strictEqual(rippleTransactions[i].from_currency, 'USD');
        }
        done();
      })
    });
  });

});

