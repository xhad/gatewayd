var gateway = require(__dirname+'/../');

var queue = require(__dirname+'/../lib/queues/withdrawal_processor.js');
var sql = require(__dirname+'/../lib/data/sequelize.js');
var TIMEOUT = 1000;
var FEE = 1 - gateway.config.get("WITHDRAWAL_FEE");

function getIncomingTransaction(fn){
  gateway.data.models.rippleTransactions.find({
    where: { state: 'incoming' }
  }).complete(fn);
}

function finalizeRippleTransaction(rippleTransaction, sqlTransaction, done){
  var query = "update ripple_transactions set state = 'succeeded'";
    query += " where id = "+rippleTransaction.id+" and state = 'incoming'";
  sql.query(query).complete(function(err, rippleTransaction){
    if (err) { console.log('error', err) };
    done();
  });
}

function getTransactionRippleAddress(rippleTransaction, fn){
  gateway.data.models.rippleAddresses.find({
    where: { id: rippleTransaction.from_address_id }
  }).complete(function(err, address) {
    if (err){
      fn(err, null);
    } else if (address){
      fn(null, address);
    } else {
      fn('no address found', null);
    }
  });
};

function handleIncomingTransaction(rippleTransaction, done){
  getTransactionRippleAddress(rippleTransaction, function(err, address){
    if (err) { console.log('error', err); done(); return; };
    sql.transaction(function(sqlTransaction) {
      createWithdrawal(rippleTransaction, address, sqlTransaction, function(err){
        if (err) { console.log('error', err); done(); return; };
        finalizeRippleTransaction(rippleTransaction, sqlTransaction, done);
      })
    });
  })
};

function createWithdrawal(rippleTransaction, address, sqlTransaction, callback){
  gateway.data.models.externalTransactions.create({
    deposit: false,
    amount: rippleTransaction.to_amount * (1 - gateway.config.get("WITHDRAWAL_FEE")),
    currency: rippleTransaction.to_currency,
    status: 'queued',
    ripple_transaction_id: rippleTransaction.id,
    external_account_id: address.tag
  }).complete(function(err, withdrawal) {
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
    } else if (transaction) {
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

