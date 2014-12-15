var SqlMqWorker = require('sql-mq-worker');
var PolicyEngine = require(__dirname+'/../lib/core/policy_engine.js');
var gatewayd = require(__dirname+'/../');
var policyEngine = new PolicyEngine();

var worker = new SqlMqWorker({
  Class: gatewayd.data.models.externalTransactions,
  predicate: { where: {
    deposit: true,
    status: 'incoming'
  }},
  job: function(deposit, next) {
    console.log('incoming deposit', deposit.toJSON());
    policyEngine.determinePolicy(deposit)
    .then(function(policy) {
      return policy.apply(deposit).then(next);
    })
    .error(function(error) {
      deposit.setData('error', error);
      deposit.updateAttributes({ status: 'failed' })
      .complete(next);
    });
  }
});

worker.start();

