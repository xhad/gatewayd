var gatewayd = require(__dirname+'/../../');
var assert   = require('assert');

if (gatewayd.features.isEnabled('gateway-transactions')) {

  describe('api.constructExternalInvoice', function() {

    it('should reocord an invoice for outgoing external payment', function() {

      gatewayd.api.constructExternalInvoice({
        direction: 'outgoing',
        destination_address: 'acct:me@stevenzeiler.com',
        source_address: 'acct:gateway@gatewayd.org',
        source_currency: 'BTC',
        source_amount: 3,
        destination_currency: 'XAG',
        destination_amount: 50
      })
      .then(function(rippleTransaction) {
        assert.strictEqual(rippleTransaction.state, 'invoice');
        assert.strictEqual(rippleTransaction.direction, 'outgoing');
        assert(rippleTransaction.to_address_id);
        assert(rippleTransaction.from_address_id);
        assert(rippleTransaction.id);
      });
    });

    it('should record an invoice for incoming external payment', function() {
      gatewayd.api.constructExternalInvoice({
        direction: 'incoming',
        source_address: 'acct:me@stevenzeiler.com',
        destination_address: 'acct:gateway@gatewayd.org',
        source_currency: 'XAU',
        source_amount: 50,
        destination_currency: 'XAU',
        destination_amount: 50
      })
      .then(function(externalTransaction) {
        assert.strictEqual(externalTransaction.state, 'invoice');
        assert.strictEqual(externalTransaction.direction, 'incoming');
        assert(externalTransaction.to_address_id);
        assert(externalTransaction.from_address_id);
        assert(externalTransaction.id);
      });
    });
  });
}

