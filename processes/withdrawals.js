var gateway = require(__dirname+'/../');

var queue = require(__dirname+'/../lib/queues/withdrawal_processor.js');
var sql = require(__dirname+'/../node_modules/ripple-gateway-data-sequelize/lib/sequelize.js');
var TIMEOUT = 1000;
var FEE = 1 - gateway.config.get("WITHDRAWAL_FEE");

function getIncomingTransaction(fn){
  gateway.models.rippleTransactions.find({ where: { incoming: true }})
  .complete(function(fn);
}

function finalizeRippleTransaction(rippleTransaction, sqlTransaction, done){
  var query = 'update ripple_transactions set "transaction_state" = "succeeded"';
    query += 'where id = '+rippleTransaction.id+' and "transaction_state" = "incoming"';
  sql.query(query).success(function(){
    sqlTransaction.commit();
    done();
  }).error(function(){
    sqlTransaction.rollback;
    done();
  });
}

function getTransactionRippleAddress(rippleTransaction, function(err, address){
  var query = { where: { id: payment.from_address_id }};
  gateway.data.rippleAddresses.find(query, function(err, address) {
    if (err){
      fn(err, null);
    } else if (address){
      fn(null, address);
    } else {
      fn('no address found', null);
    }
  });
});

function handleIncoming(rippleTransaction, done){
  getTransactionRippleAddress(function(err, address)
    if (err) { console.log('error', err); done(); return; };
    sql.transaction(function(sqlTransaction) {
      createWithdrawal(rippleTransaction, address, sqlTransaction, function(err){
        if (err) { console.log('error', err); done(); return; };
        finalizeRippleTransaction(rippleTransaction, sqlTransaction, done);
      })
    });
  })
});

function createWithdrawal(rippleTransaction, address, sqlTransaction, callback){
  gateway.data.externalTransactions.create({
    deposit: false,
    amount: rippleTransactoin.to_amount * (1 - gateway.config.get("WITHDRAWAL_FEE")),
    currency: rippleTransaction.to_currency,
    status: 'queued',
    ripple_transaction_id: payment.id,
    external_account_id: address.tag
  }, function(err, withdrawal) {
    if (err) {
      sqlTransaction.rollback();
      callback(err);
    } else if (withdrawal) {
      callback();
    } else {
      sqlTransaction.rollback();
      callback('withdrawal not found');
    }
  });
}

function getNextIncomingTransaction(callback){
  getIncomingTransaction(function(err, transaction){
    if (err) {
      setTimeout(function(){
        callback(callback);
      }, TIMEOUT);
    } else if {
      handleIncomingTransaction(transaction, function(){
        callback(callback);
      });
    } else {
      setTimeout(function(){
        callback(callback);
      }, TIMEOUT);
    }
  });
}

getNextIncomingTransaction(getNextIncomingTransaction);

console.log('Processing withdrawals from the inbound ripple payment queue.');

