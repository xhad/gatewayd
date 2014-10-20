const requireAll = require('require-all');
var policies = requireAll(__dirname+'/../../config/policies/');
const Promise = require('bluebird');
const async = require('async');

for (name in policies) {
  policies[name].getName = function() { return name };
}

function PolicyEngine(options) {
  var options = options || {};
  this.order = options.order || [
    'invoice_policy',
    'user_policy',
    'default_policy'
  ]
};

PolicyEngine.prototype.getPolicy = function getPolicy(policyName) {
  return policies[policyName]; 
}

PolicyEngine.prototype.determinePolicy = function determinePolicy(payment) {
  var engine = this;
  return new Promise(function(resolve, reject) {
    var policyThatApplies;

    async.forEachSeries(engine.order, function(policyName, callback) {
      if (!policyThatApplies) {
        var policy = engine.getPolicy(policyName);
        policy.doesApply(payment).then(function(applies) {
          if (applies) {
            policyThatApplies = policy;
            callback();
          } else {
            callback();
          }
        }).error(callback);
      } else {
        callback();
      }
    }, function(error, response) {
      if (policyThatApplies) {
        resolve(policyThatApplies);
      } else if (error) {
        reject(error); 
      } else {
        resolve(engine.getPolicy('default_policy'));
      }
    })
  });
}

PolicyEngine.prototype.removePolicy = function removePolicy(policyName, policyInstance) {
  // remove from both the polices object and the order array
}

PolicyEngine.prototype.addPolicyAfter = function addPolicyAfter(targetPolicyName, addedPolicyName, addedPolicy) {
  // insert in the order array after a given policy  
}

PolicyEngine.prototype.addPolicyBefore = function addPolicyBefore(targetPolicyName, addedPolicyName, addedPolicy) {
  // insert in the order array before a given policy 
}

module.exports = PolicyEngine;

