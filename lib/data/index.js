var requireAll = require('require-all-to-camel');
var Sequelize = require('sequelize');

var chainer = new Sequelize.Utils.QueryChainer();
var models = requireAll(__dirname+'/models');

models.rippleAddresses.hasMany(models.rippleTransactions, {
  as: 'Payments'
});

models.rippleTransactions.belongsTo(models.rippleAddresses, {
  as: 'ToAddress',
  foreignKey: 'to_address_id',
  foreignKeyConstraint: true
});

models.rippleTransactions.belongsTo(models.rippleAddresses, {
  as: 'FromAddress',
  foreignKey: 'from_address_id',
  foreignKeyConstraint: true
});

models.rippleAddresses.hasMany(models.rippleTransactions,  {
  as: 'PaymentsTo',
  foreignKey: 'to_address_id'
});

models.rippleAddresses.hasMany(models.rippleTransactions, {
  as: 'PaymentsFrom',
  foreignKey: 'from_address_id'
});

models.externalTransactions.belongsTo(models.externalAccounts, {
  as: 'ToAccount',
  foreignKey: 'destination_account_id',
  foreignKeyConstraint: true
});

models.externalTransactions.belongsTo(models.externalAccounts, {
  as: 'FromAccount',
  foreignKey: 'source_account_id',
  foreignKeyConstraint: true
});

models.externalAccounts.hasMany(models.externalTransactions,  {
  as: 'PaymentsTo',
  foreignKey: 'to_account_id'
});

models.rippleAddresses.hasMany(models.externalTransactions,  {
  as: 'PaymentsFrom',
  foreignKey: 'from_account_id'
});

models.sync = function(callback) {
  chainer.add(models.rippleTransactions.sync());
  chainer.add(models.rippleAddresses.sync());
  chainer.add(models.gatewayTransactions.sync());
  chainer.add(models.externalAccounts.sync());
  chainer.add(models.externalTransactions.sync());
  chainer.run().then(function() {
    callback();
  }).error(function(error) {
    callback(error);
  });
};

exports.models = models; 

