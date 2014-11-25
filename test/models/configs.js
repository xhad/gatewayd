process.env.NODE_ENV = 'test_in_memory';

const assert = require('assert');
const gatewayd = require(__dirname+'/../../');
const Config = gatewayd.models.configs;

describe('configs model', function() {
  var createdConfig;

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it('should require a key and value', function(done) {
    Config.create().error(function(error) {
      assert.strictEqual(error.key[0], 'Validation notNull failed: key');
      assert.strictEqual(error.value[0], 'Validation notNull failed: value');
      done();
    });
  });

  it('should set a config item', function(done) {
    Config.set('identifier', 'ripple:stevenzeiler').then(function(config) {
      createdConfig = config;
      assert.strictEqual(config.key, 'identifier');
      assert.strictEqual(config.value, 'ripple:stevenzeiler');
      done();
    })
  });

  it('should return a previously created config item', function(done) {
    Config.set('identifier', 'ripple:stevenzeiler').then(function(config) {
      Config.get('identifier').then(function(config) {
        assert.strictEqual(config.value, 'ripple:stevenzeiler');
        done();
      });
    });
  });
  
  it('should return an empty config item', function(done) {
    Config.get('nonexistantKeyItem').then(function(config) {
      assert(!config);
      done();
    });
  });
});


