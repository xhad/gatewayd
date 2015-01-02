var gatewayd = require(__dirname+'/../../');
var assert   = require('assert');

if (gatewayd.features.isEnabled('gateway-transactions')) {

  describe('api.constructRippleInvoice', function() {

    it('should work like enqueueOutgoingPayment except with different state', function() {

      gatewayd.api.constructRippleInvoice({
        direction: 'outgoing',
        destination_address: 'rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe',
        destination_tag: 12345,
        destination_currency: 'XAG',
        destination_amount: 50,
        source_currency: 'BTC'
      })
      .then(function(rippleTransaction) {
        assert.strictEqual(rippleTransaction.state, 'invoice');
        assert.strictEqual(rippleTransaction.direction, 'outgoing');
        assert(rippleTransaction.to_address_id);
        assert(rippleTransaction.from_address_id);
        assert(rippleTransaction.id);
      });
    });

    it('should record an invoice for incoming ripple payment', function() {
      gatewayd.api.constructRippleInvoice({
        direction: 'incoming',
        source_address: 'rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe',
        destination_tag: 123456783784394,
        destination_currency: 'XAG',
        destination_amount: 50
      })
      .then(function(rippleTransaction) {
        assert.strictEqual(rippleTransaction.state, 'invoice');
        assert.strictEqual(rippleTransaction.direction, 'incoming');
        assert(rippleTransaction.to_address_id);
        assert(rippleTransaction.from_address_id);
        assert(rippleTransaction.id);
      });
    });
  });
}

