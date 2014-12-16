process.env.NODE_ENV          = 'test_in_memory';
const chai                    = require('chai');
const sinon                   = require('sinon');
const gatewayd                = require(__dirname+'/../../');
const RippleRestClient        = require('ripple-rest-client');
const incomingPaymentFixtures = require(__dirname+'/../fixtures/incoming_payments.js');

describe('Get or fetch last payment hash', function(){

  var rippleRestGetPayments;
  var getPaymentsSpy;
  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  before(function(){
    var configStub = sinon.stub(gatewayd.config, 'get');
    configStub.withArgs('COLD_WALLET').returns(incomingPaymentFixtures.incoming_payments.valid.destination_account);

    rippleRestGetPayments = sinon.stub(RippleRestClient.prototype, 'getPayments');
    getPaymentsSpy        = sinon.spy();
  });


  it('should get or fetch last payment hash from the network', function(done){
    var paymentObject = incomingPaymentFixtures.incoming_payments.makeArrayOfPayments();
    rippleRestGetPayments.yields(null, paymentObject.payments);
    RippleRestClient.prototype.getPayments(paymentObject, getPaymentsSpy);

    gatewayd.api.getOrFetchLastPaymentHash()
      .then(function(hash){
        chai.assert(getPaymentsSpy.called);
        chai.assert.strictEqual(hash, incomingPaymentFixtures.incoming_payments.valid.hash);
        done();
      })
      .error(function(error){
        chai.assert.isNull(error);
        done(new Error(error));
      });
  });

  after(function() {
    gatewayd.config.get.restore();
    RippleRestClient.prototype.getPayments.restore();
  });

});
