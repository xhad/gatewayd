process.env.NODE_ENV = 'test_in_memory';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var config = require(__dirname+'/../../config/environment.js');
var getHostedAddress = require(__dirname+'/../../lib/api/get_hosted_address.js');
var RippleAddress = require(__dirname+'/../../').data.models.rippleAddresses;

describe('get_hosted_address ', function() {

  chai.use(chaiAsPromised);

  beforeEach(function(done) {
    RippleAddress.initModel(true).then(function() {
      done();
    });
  });

  it('should successfully persist a ripple_address record associated with the cold_wallet of the gateway given a tag', function() {
    return getHostedAddress(1234)
      .then(function(hostedAddress) {
        chai.assert.strictEqual(hostedAddress.address, config.get('COLD_WALLET'));
        chai.assert.strictEqual(hostedAddress.tag, 1234);
        chai.assert.strictEqual(hostedAddress.type, 'hosted');
        chai.assert.strictEqual(hostedAddress.managed, true);
      }).error(function(error) {
        throw new Error(JSON.stringify(error));
      })
  });

  it('should fail to persist a ripple_address record because \'tag\' field is not an int', function() {
    return chai.assert.isRejected(getHostedAddress('ab123'), {tag: ['Validation isInt failed: tag']});
  });

});
