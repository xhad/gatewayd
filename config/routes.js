var requireAll = require('require-all');
var passport = require('./initializers/passport.js');
var ctrls = require('../app/controllers/index.js');

module.exports = (function(){
  function configure(app) {
    app.get('/', function(req, res){ res.render('index.html') })
    /////////////////////////
    //  Unauthenticated Resources

    app.get('/api/v1/settings', 
      ctrls['settings'].index);

    ////////////////////////
    //  Secured with Basic Auth

    app.post('/api/v1/users', 
      passport.authenticate('basic', { session: false }),
      ctrls['users'].create)

    app.get('/api/v1/users', 
      passport.authenticate('basic', { session: false }), 
      ctrls['users'].index);

    app.get('/api/v1/users/:user_id', 
      passport.authenticate('basic', { session: false }), 
      ctrls['users'].show);

    app.get('/api/v1/external_accounts', 
      passport.authenticate('basic', { session: false }),
      ctrls['external_accounts'].index);

    app.post('/api/v1/external_accounts', 
      passport.authenticate('basic', { session: false }),
      ctrls['external_accounts'].create);

    app.get('/api/v1/external_transactions', 
      passport.authenticate('basic', { session: false }),
      ctrls['external_transactions'].index);

    app.post('/api/v1/deposits',
      passport.authenticate('basic', { session: false }),
      ctrls['deposits'].create);

    app.get('/api/v1/deposits',
      passport.authenticate('basic', { session: false }),
      ctrls['deposits'].index);

    app.post('/api/v1/withdrawals',
      passport.authenticate('basic', { session: false }),
      ctrls['withdrawals'].create);

    app.get('/api/v1/withdrawals/pending',
      passport.authenticate('basic', { session: false }),
      ctrls['withdrawals'].pending);

    app.post('/api/v1/withdrawals/:id/clear',
      passport.authenticate('basic', { session: false }),
      ctrls['withdrawals'].create);

    app.get('/api/v1/balances', 
      passport.authenticate('basic', { session: false }),
      ctrls['balances'].index);

    app.get('/api/v1/ripple_addresses', 
      passport.authenticate('basic', { session: false }),
      ctrls['ripple_addresses'].index);

    app.get('/api/v1/ripple_addresses/:account', 
      passport.authenticate('basic', { session: false }),
      ctrls['ripple_addresses'].show);

    app.get('/api/v1/ripple_addresses/:account/tag/:tag', 
      passport.authenticate('basic', { session: false }),
      ctrls['ripple_addresses'].show);

    app.post('/api/v1/ripple_addresses', 
      passport.authenticate('basic', { session: false }),
      ctrls['ripple_addresses'].create);

    app.get('/api/v1/ripple_transactions', 
      passport.authenticate('basic', { session: false }),
      ctrls['ripple_transactions'].index);

    app.post('/api/v1/ripple_transactions',
      passport.authenticate('basic', { session: false }),
      ctrls['ripple_transactions'].create);

    app.get('/api/v1/ripple_transactions/pending',
      passport.authenticate('basic', { session: false }),
      ctrls['ripple_transactions'].create);

    /////////////////////////
  }

  return { route: configure }
})()
