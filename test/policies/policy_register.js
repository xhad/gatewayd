const PolicyRegister = require(__dirname+'/../../lib/policies/policy_register.js');
const Policy = require(__dirname+'/../../lib/policies/base.js');
const assert = require('assert');

describe('PolicyRegister', function() {

  it('should add policies to the top of the register', function() {
    var register = new PolicyRegister();

    register.add(new Policy({ name: "default_policy" }));
    register.add(new Policy({ name: "user_policy" }));
    register.add(new Policy({ name: "invoice_policy" }));

    assert.strictEqual(register.listPolicies()[0].getName(), 'invoice_policy');
  });

  it('should remove policies by name', function() {
    var register = new PolicyRegister();

    register.add(new Policy({ name: "creepy_policy" }));
    register.add(new Policy({ name: "silly_policy" }));

    register.remove('silly_policy');

    assert.strictEqual(register.listPolicies()[0].getName(), 'creepy_policy');
    assert(!register.listPolicies()[1]);
  }); 

  it('should add a policy before another policy by name', function() {
    var register = new PolicyRegister();

    register.add(new Policy({ name: "creepy_policy" }));
    register.add(new Policy({ name: "silly_policy" }));

    register.addAfter('creepy_policy', new Policy({ name: 'slick_policy' }));

    assert.strictEqual(register.listPolicies()[1].getName(), 'creepy_policy');
    assert.strictEqual(register.listPolicies()[2].getName(), 'slick_policy');
  });

  it('should add a policy after another policy by name', function() {
    var register = new PolicyRegister();

    register.add(new Policy({ name: "creepy_policy" }));
    register.add(new Policy({ name: "silly_policy" }));
    register.add(new Policy({ name: "slick_policy" }));

    register.addBefore('silly_policy', new Policy({ name: 'massive_policy' }));

    assert.strictEqual(register.listPolicies()[2].getName(), 'silly_policy');
    assert.strictEqual(register.listPolicies()[1].getName(), 'massive_policy');
  });

  it('should get a policy by name', function() {
    var register = new PolicyRegister();
    var policy = new Policy({ name: "creepy_policy" });

    register.add(policy)

    assert.strictEqual(register.getPolicy('creepy_policy'), policy);
  });
});

