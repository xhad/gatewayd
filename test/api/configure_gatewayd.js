const chai            = require('chai');
const chaiAsPromised  = require('chai-as-promised');
const sinon           = require('sinon');
var gatewayd          = require(__dirname+'/../../');
var configureGatewayd = gatewayd.api.configureGatewayd;


describe('Configure Gatewayd', function (){
  chai.use(chaiAsPromised);
  var options = { notifications_url: 'https://ripple.com' };
  before(function(){
    var getConfigStub = sinon.stub(gatewayd.config, 'get');
    var setConfigStub = sinon.stub(gatewayd.config, 'set');
    var saveConfigStub = sinon.stub(gatewayd.config, 'save');

    setConfigStub.withArgs('NOTIFICATION_URL', options.notifications_url).returns(options);
    saveConfigStub.yields(null);

    getConfigStub.withArgs('NOTIFICATION_URL').returns(options);

  });

  describe('validate properties', function(){

    it('should be fulfilled', function(){
      return chai.assert.isFulfilled(configureGatewayd._validate({ notifications_url: 'https://ripple.com' }));
    });

    it('should reject if config object is missing', function() {
      const invalidObjects = [null, undefined, {}, ''];

      invalidObjects.forEach(function(invalidObjects) {
        return chai.assert.isRejected(configureGatewayd._validate(invalidObjects), /ConfigurationParametersMissing/);
      });

    });

    it('should reject if notification_url is missing', function() {
      return chai.assert.isRejected(configureGatewayd._validate({ notifications_url: '' }), /MissingNotificationURL/);
    });

    it('should reject if notification_url is not a valid URL', function() {
      return chai.assert.isRejected(configureGatewayd._validate({ notifications_url: 'invalidUrl' }), /InvalidNotificationURL/);
    });

  });

  describe('set configuration properties', function(){

    it('should successfully save notification_url', function(done){
      configureGatewayd.set(options)
        .then(function(config){
          chai.assert.deepEqual(config, options);
          chai.assert(config.hasOwnProperty('notifications_url'));
          done();
        })
        .error(function(error){
          done(new Error(error));
        })
    });

    it('should only save white listed config properties', function(done){
      configureGatewayd.set({ some_other_thing: 'value', notifications_url: 'https://ripple.com'})
      .then(function(config){
          chai.assert.deepEqual(config, options);
          done();
      }).error(function(error){
          done(new Error(error));
        });
    });

    it('should filter white listed config properties', function(done){
      configureGatewayd._filterWhiteListed({ some_other_thing: 'value', notifications_url: 'https://ripple.com'})
        .then(function(config){
          chai.assert.deepEqual(config, options);
          done();
        }).error(function(error){
          done(new Error(error));
        })
    });
  });
  after(function(){
    gatewayd.config.set.restore();
    gatewayd.config.get.restore();
    gatewayd.config.save.restore();
  });
});
