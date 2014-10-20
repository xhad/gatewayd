var SqlMqWorker = require('sql-mq-worker');
var gatewayd = require(__dirname+'/../');

var worker = new SqlMqWorker({
  Class: gatewayd.data.models.externalTransactions,
  predicate: { where: {
    deposit: true,
    status: 'incoming'
  }},
  job: function(deposit, callback) {
    gatewayd.policies.determinePolicy(deposit).then(function(policy) {
      gatewayd.policies.getPolicy('default_policy').apply(deposit)
        .then(callback)
        .error(callback)
    })
  }
});

worker.start();

