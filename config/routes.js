var router
var controllers

module.exports = (function(){
  function configure(app, ctrls) {
    router = app; controllers = ctrls
    app.get('/', function(req, res){ res.render('index.html') })

    // Users
    get('/v1/gateway/users/:userId/gateway_account', 'users#account')
    post('v1/gateway/users', 'users#create')

    // Gateway Accounts
    post('/v1/gateway/users/:userId/gateway_accounts', 'gateway_accounts#create')

    // Gateway Transactions
    get('/v1/gateway/accounts/:accountId/transactions', 'gateway_transactions#forAccount')

    // Gateway Deposits
    post('/v1/gateway/accounts/:accountId/deposits', 'deposits#create')

    // Gateway Withdrawals
    post('/v1/gateway/accounts/:accountId/withdrawals', 'withdrawals#create')
    get('/api/v1/gateway/withdrawals', 'gateway_withdrawals#pending')
    post('/api/v1/gateway/withdrawals/:id/accept', 'gateway_withdrawals#accept')
    post('/api/v1/gateway/withdrawals/:id/reject', 'gateway_withdrawals#reject')

    // Balances
    get('/v1/gateway/accounts/:accountId/balances', 'balances#index')

    // Ripple Addresses
    get('/v1/accounts/:account_id/ripple_addresses', 'ripple_addresses#index')
    get('/v1/accounts/:account_id/ripple_transactions/:address', 'ripple_transactions#index')

    // Ripple Transactions
    get('/api/v1/ripple_addresses/:address/ripple_transactions', 'ripple_transactions#index')
    get ('/api/v1/ripple_transactions/:ripple_transaction_id', 'ripple_transactions#show')

    // Ripple Deposits
    get('/api/v1/ripple_addresses/:address/deposits', 'rippleDeposits#index')
    post('/api/v1/ripple_addresses/:address/deposits', 'rippleDeposits#create')

    // Ripple Withdrawals
    get('/v1/ripple_addresses/:address/withdrawals', 'ripple_withdrawals#show')
    post('/v1/ripple_addresses/:address/withdrawals', 'ripple_transactions#create')
    put('/v1/ripple_addresses/:address/withdrawals/:id', 'ripple_transactions#update')
  }

  function route(method, path, controllerAction) {
    controller = controllerAction.split('#')[0]
    action = controllerAction.split('#')[1]
    router[method](path, controllers[controller][action])
  }

  function get(path, action) { route('get', path, action) } 
  function put(path, action) { route('put', path, action) }
  function post(path, action) { route('post', path, action) }
  function del(path, action) { route('delete', path, action) }

  return { configure: configure  }
})()
