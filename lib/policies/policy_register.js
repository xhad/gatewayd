
function PolicyRegister() {
  this._policies = {};
  var order = [];
  order.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  this._order = order;
};

PolicyRegister.prototype = {

  add: function(policy) {
    this._policies[policy.getName()] = policy;
    this._order.unshift(policy.getName());
  },

  remove: function(policyName) {
    delete this._policies[policyName];
    this._order.remove(policyName);
  },
  
  listPolicies: function() {
    var array = [];
    var policies = this._policies;
    this._order.forEach(function(name) {
      array.push(policies[name]);
    });
    return array;
  },

  getPolicy: function(policyName) {
    return this._policies[policyName];
  },
  
  getOrder: function() {
    return this._order;
  },
  
  addBefore: function(targetPolicyName, policy) {
    var index = this._order.indexOf(targetPolicyName);
    this._order.splice(index, 0, policy.getName());
    this._policies[policy.getName()] = policy;
  },
  
  addAfter: function(targetPolicyName, policy) {
    var index = this._order.indexOf(targetPolicyName);
    this._order.splice(index + 1, 0, policy.getName());
    this._policies[policy.getName()] = policy;
  }
}

module.exports = PolicyRegister;
