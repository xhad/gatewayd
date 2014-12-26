const request         = require('supertest');
const chai            = require('chai');
const sinon           = require('sinon');
const sinonAsPromised = require('sinon-as-promised');
var gatewayd          = require(__dirname+'/../../');
var app               = gatewayd.server;

describe('Configure gatewayd', function() {

  before(function() {
    configureGatewaydSet = sinon.stub(gatewayd.api.configureGatewayd, 'set');
    configGet = sinon.stub(gatewayd.config, 'get');

    configGet.withArgs('DOMAIN').returns('admin@example.com');
    configGet.withArgs('KEY').returns('password');
  });

  it('should successfully save configuration -- v1/config', function(done) {
    configureGatewaydSet.resolves({ notifications_url: 'https://ripple.com' });
    http
      .post('/v1/config')
      .auth('admin@'+gatewayd.config.get('DOMAIN'), gatewayd.config.get('KEY'))
      .expect(200)
      .send({ notifications_url: 'https://ripple.com' })
      .end(function(error, response){
        chai.assert.deepEqual(response.body.configurations, { notifications_url: 'https://ripple.com' });
        done();
      });
  });

  it('should ignore non-whitelisted save configuration -- v1/config', function(done) {
    http
      .post('/v1/config')
      .auth('admin@'+gatewayd.config.get('DOMAIN'), gatewayd.config.get('KEY'))
      .expect(200)
      .send({ notifications_url: 'https://ripple.com', non_whitelisted: 'value' })
      .end(function(error, response){
        chai.assert(response.body.success);
        chai.assert.deepEqual(response.body.configurations, { notifications_url: 'https://ripple.com' });
        done();
      });
  });

  it('should respond with error -- missing config object', function(done) {
    configureGatewaydSet.rejects(new Error('ConfigurationParametersMissing'));
    http
      .post('/v1/config')
      .auth('admin@'+gatewayd.config.get('DOMAIN'), gatewayd.config.get('KEY'))
      .expect(400)
      .send({})
      .end(function(error, response){
        chai.assert(!response.body.success);
        chai.assert.deepEqual(response.body.message, 'ConfigurationParametersMissing');
        done();
      });
  });

  after(function() {
    configureGatewaydSet.restore();
    configGet.restore();
  });

});
