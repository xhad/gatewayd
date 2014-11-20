const Promise = require('bluebird');
const requireAll = require('require-all');
const policies = requireAll(__dirname+'/../../config/policies/');
const async = require('async');

function PolicyEngine() { 
  var _this = this;
  this.policiesOrder = [
    'invoice_policy',
    'bridge_policy',
    'user_policy',
    'no_policy'
  ];

  this.policies = [];
  this.policiesOrder.forEach(function(name) {
    _this.policies.push({
      name: name,
      policy: policies[name]
    });
  });
}

PolicyEngine.prototype.determinePolicy = function determinePolicy(payment) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    var series = [];
    var policyMatch;
    _this.policies.forEach(function(policy) {
      var asyncPolicy = Promise.promisify(policy);
      series.push(function(next) {
        if (policyMatch) {
          return next();
        }
        asyncPolicy.doesApply(payment)
        .then(function() {
          policyMatch = policy;
        })
        .error(next);
      });
    });
    async.series(series, function(error, results) {
      if (error) {
        return reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = PolicyEngine;

