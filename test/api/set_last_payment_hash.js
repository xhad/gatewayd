process.env.NODE_ENV            = 'test_in_memory';
const chai                      = require('chai');
const sinon                     = require('sinon');
const gatewayd                  = require(__dirname+'/../../');
const incomingPaymentFixtures   = require(__dirname+'/../fixtures/incoming_payments.js');

describe('Set last payment hash', function(){

  before(function(){
    var configStub = sinon.stub(gatewayd.config, 'get');
    configStub.withArgs('COLD_WALLET').returns(incomingPaymentFixtures.incoming_payments.valid.destination_account);
  });

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should set last payment hash', function(done){
    gatewayd.api.setLastPaymentHash(incomingPaymentFixtures.incoming_payments.valid.hash)
      .then(function(hash){
        chai.assert.strictEqual(hash, incomingPaymentFixtures.incoming_payments.valid.hash);
        done();
      })
      .error(done);
  });

  it('should fail because hash was not passed', function(done){
    gatewayd.api.setLastPaymentHash()
      .then(function(hash){
        chai.assert.isNull(hash);
        done();
      })
      .error(function(error){
        chai.assert.strictEqual(error.message, 'HashNotFound');
        done();
      });
  });

  after(function(){
    gatewayd.config.get.restore();
  });

});
