var usersController = require(__dirname+'/../controllers/resources/users_controller.js');
var externalAccountsController = require(__dirname+'/../controllers/resources/external_accounts_controller.js');
var externalTransactionsController = require(__dirname+'/../controllers/resources/external_transactions_controller.js');
var rippleAddressesController = require(__dirname+'/../controllers/resources/ripple_addresses_controller.js');
var rippleTransactionsController = require(__dirname+'/../controllers/resources/ripple_transactions_controller.js');

function ResourcesRouter(opts){
  this.passport = opts.passport;
  this.authName = opts.authName;
};

ResourcesRouter.prototype.bind = function(app){
  var router = this;
  function auth() {
    return router.passport.authenticate(router.authName, {session: false });
  };
  app.get('/v1/users', auth(), usersController.index);
  app.get('/v1/users/:id', auth(), usersController.show);

  app.get('/v1/external_accounts', auth(), externalAccountsController.index);
  app.get('/v1/external_accounts/:id', auth(), externalAccountsController.show);

  app.get('/v1/external_transactions', auth(), externalTransactionsController.index);
  app.get('/v1/external_transactions/:id', auth(), externalTransactionsController.show);

  app.get('/v1/ripple_addresses', auth(), rippleAddressesController.index);
  app.get('/v1/ripple_addresses/:id', auth(), rippleAddressesController.show);

  app.get('/v1/ripple_transactions', auth(), rippleTransactionsController.index);
  app.get('/v1/ripple_transactions/:id', auth(), rippleTransactionsController.show);
};

module.exports = ResourcesRouter;
