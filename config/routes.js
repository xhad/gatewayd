module.exports = (function(){
  function configure(app, ctrls) {
    app.get('/', function(req, res){ res.render('index.html') })

    get('/v1/gateway/users/:userId/gateway_account', 'users#account')
    post('v1/gateway/users', 'users#create')
    post('/v1/gateway/users/:userId/gateway_accounts', 'users#account')
    post('/v1/gateway/accounts/:accountId/deposits', 'deposits#create')
    get('/v1/gateway/accounts/:accountId/transactions', 'gateway_transactions#forAccount')
    get('/v1/users/:userId/gateway/accounts', 'accounts#userAccount')
    get('/v1/users/:userId/ripple_addresses','ripple_addresses#userIndex')
    post('/v1/users/:userId/gateway/accounts', 'accounts#create')
    post('/v1/users/:userId/ripple_addresses', 'ripple_addresses#create')

    post('/v1/gateway/accounts/:accountId/withdrawals', 'withdrawals#create')
    get('/v1/gateway_transactions', 'gateway_transactions#index')
    get('/v1/withdrawals', 'withdrawals#index')
    get('/v1/deposits', 'deposits#index')

    get('/v1/gateway/accounts', 'accounts#index')
    post('/v1/gateway/accounts', 'accounts#create')
    get('/v1/ripple_addresses', 'ripple_addresses#index')
    get('/v1/ripple_transactions', 'ripple_transactions#index')
    post('/v1/ripple_transactions', 'ripple_transactions#create')
    get('/v1/ripple_transactions/:id', 'ripple_transactions#show')
    put('/v1/ripple_transactions/:id', 'ripple_transactions#update')
  }

  function route(method, path, controllerAction) {
    controllerAction = controllerAction.split('#')[0]
    controller = controllerAction[0]
    action = controllerAction[1]
    app[method](path, controller][action])
  }

  function get(path, action) { route('get', path, action) } 
  function put(path, action) { route('put', path, action) }
  function post(path, action) { route('post', path, action) }
  function del(path, action) { route('delete', path, action) }

  return { configure: configure  }
})()
