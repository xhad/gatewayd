process.env.NODE_ENV = 'test_in_memory';
const gatewayd = require(__dirname+'/../../');

var assert = require("assert");
var Policy = gatewayd.models.policies;

var createdPolicy;

describe("policies model", function() {

  beforeEach(function(done) {
    gatewayd.database.sync({force: true}).then(function() {
      done();
    });
  });

  it("should create a valid policy record", function(next) {
    Policy.create({
      ripple_address_id: 99,
      external_account_id: 27,
      name: "default",
      fee: 0.77
    }).complete(function(error, policy) {
      createdPolicy = policy;
      assert(policy.id > 0);
      assert.strictEqual(policy.ripple_address_id, 99);
      assert.strictEqual(policy.external_account_id, 27);
      assert.strictEqual(policy.fee, 0.77);
      assert.strictEqual(policy.name, "default");
      next();
    });
  });

  it("should require a ripple address id", function() {
    var policy = Policy.build({
      external_account_id: 97
    });
    assert.strictEqual(policy.validate().ripple_address_id[0],
      'Validation notNull failed: ripple_address_id');
  });

  it("should require an external account id", function() {
    var policy = Policy.build({
      ripple_address_id: 97
    });
    assert.strictEqual(policy.validate().external_account_id[0],
      'Validation notNull failed: external_account_id');
  });

});

