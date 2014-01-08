module.exports = (function(){
  function configure(app, ctrls) {
    app.get('/', function(req, res){
      res.render('index.html') 
    })
    app.get('/v1/gateway/users/:userId/gateway_account', ctrls['users'].account)
    app.post('/v1/gateway/users', ctrls['users'].create)
    app.get('/v1/gateway/accounts/:account_id/balances', 
        ctrls['balances'].userBalances)
    app.get('/v1/users/:userId/bank_accounts',
        ctrls['accounts'].userIndex)
    app.get('/v1/users/:userId/ripple_addresses',
        ctrls['ripple_addresses'].userIndex)
    app.get('/v1/users/:userId/bank_transactions', 
        ctrls['bank_transactions'].userIndex)
    app.get('/v1/users/:userId/ripple_transactions', 
        ctrls['ripple_transactions'].userIndex)

    app.post('/v1/users/:userId/bank_accounts', 
        ctrls['accounts'].create);
    app.post('/v1/users/:userId/ripple_addresses', 
        ctrls['ripple_addresses'].create);

    app.post('/v1/ripple_transactions/inbound', 
        ctrls['ripple_transactions'].createInbound);
    app.post('/v1/withdrawals', ctrls['withdrawals'].create);
    app.post('/v1/deposits', ctrls['deposits'].create);

    app.get('/v1/bank_transactions', ctrls['bank_transactions'].index);
    app.get('/v1/withdrawals', ctrls['withdrawals'].index);
    app.get('/v1/deposits', ctrls['deposits'].index);

    app.get('/v1/bank_accounts', ctrls['accounts'].index);
    app.post('/v1/bank_accounts', ctrls['accounts'].create);
    app.get('/v1/balances', ctrls['balances'].index);
    app.get('/v1/ripple_addresses', ctrls['ripple_addresses'].index);
    app.get('/v1/ripple_transactions', ctrls['ripple_transactions'].index);
  }

  return { configure: configure  }
})()

