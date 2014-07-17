var externalTransactionModel = require('../models/external_transactions');
var sequelize = require('../sequelize.js');

function configure(api) {

  api.create = function(opts, fn){
    var external_transaction = externalTransactionModel.build(opts);
    var errors = external_transaction.validate(); 
    if (errors){
      fn(errors, null);
      return;
    }
    external_transaction.save().complete(function(err, external_transaction){
      if (err){
        fn(err, null);
      } else {
        fn(null, external_transaction);
      }
    });
  };

  api.read = function(opts, fn){
    externalTransactionModel.find(opts.id).complete(function(err, external_transaction){
      if (err){
        fn(err, null);
      } else if (external_transaction){
        fn(null, external_transaction);
      } else {
        fn({ id: 'record not found' }, null);
      }
    });
  };

  api.update = function(opts, fn){
    externalTransactionModel.find(opts.id).complete(function(err, external_transaction){
      if (err){
        fn(err, null);
      } else if (external_transaction) {
        delete opts.id;
        external_transaction.updateAttributes(opts).complete(fn);
      } else {
        fn({ id: 'record not found' }, null);
      }
    });

  };

  api.delete = function(opts, fn){
    externalTransactionModel.find(opts.id).complete(function(err, external_transaction){
      external_transaction.destroy().complete(function(err, data){
        fn(null, data);
      });
    });
  };

  api.readAllPending = function(opts, fn){
    var query = {
      status: 'pending',
      deposit: false,
    }; 

    if (typeof opts === 'function') {
      fn = opts;
    } else {
      if (opts.external_account_id) {
        query.external_account_id = opts.external_account_id;
      }
    }

    externalTransactionModel.findAll({ where: query }).complete(function(err, pending_withdrawals){
      if(err) {
        fn(err, null);
      } else {
        fn(null, pending_withdrawals || []);
      }
    });
  };

  api.readAll = function(opts, fn) {
    if (typeof opts === 'function') {
      fn = opts;
    }

    externalTransactionModel.findAll({ where: opts }).complete(function(err, external_transactions){
      if(err) {
        fn(err, null);
      } else {
        fn(null, external_transactions || []);
      }
    });
  };

  api.forUser = function(userId, fn) {
    var query = 'select external_transactions.id, currency, amount, deposit, ripple_transaction_id,';
    query += ' external_account_id as external_account_id, status ' ;
    query += 'from (select id from external_accounts where user_id = ' + userId + ') accounts ';
    query += 'join external_transactions on accounts.id = external_transactions.external_account_id;';

    sequelize.query(query).then(function(resp){
      fn(null, resp);
    }, function(err) {
      fn(err, null);
    });
  };

}

module.exports = configure;

