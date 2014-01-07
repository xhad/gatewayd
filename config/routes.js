module.exports = (function(){
  function configure(app, ctrls) {
    app.get('/', function(req, res){
      res.render('index.html') 
    })
    app.get('/api/v1/users', ctrls['users'].index)
    app.post('/api/v1/users', ctrls['users'].create)
    app.post('/api/v1/session', ctrls['session'].create)
    app.get('/api/v1/session', ctrls['session'].index)

    app.get('/api/v1/users/:id/balances', 
        ctrls['balances'].userBalances);
    app.get('/api/v1/users/:userId/bank_accounts',
        ctrls['accounts'].userIndex);
    app.get('/api/v1/users/:userId/ripple_addresses',
        ctrls['ripple_addresses'].userIndex);
    app.get('/api/v1/users/:userId/bank_transactions', 
        ctrls['bank_transactions'].userIndex);
    app.get('/api/v1/users/:userId/ripple_transactions', 
        ctrls['ripple_transactions'].userIndex);

    app.post('/api/v1/users/:userId/bank_accounts', 
        ctrls['accounts'].create);
    app.post('/api/v1/users/:userId/ripple_addresses', 
        ctrls['ripple_addresses'].create);

    app.post('/api/v1/ripple_transactions/inbound', 
        ctrls['ripple_transactions'].createInbound);
    app.post('/api/v1/withdrawals', ctrls['withdrawals'].create);
    app.post('/api/v1/deposits', ctrls['deposits'].create);

    app.get('/api/v1/bank_transactions', ctrls['bank_transactions'].index);
    app.get('/api/v1/withdrawals', ctrls['withdrawals'].index);
    app.get('/api/v1/deposits', ctrls['deposits'].index);

    app.get('/api/v1/bank_accounts', ctrls['accounts'].index);
    app.post('/api/v1/bank_accounts', ctrls['accounts'].create);
    app.get('/api/v1/balances', ctrls['balances'].index);
    app.get('/api/v1/ripple_addresses', ctrls['ripple_addresses'].index);
    app.get('/api/v1/ripple_transactions', ctrls['ripple_transactions'].index);
  }

  return { configure: configure  }
})()

