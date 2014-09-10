const express = require('express');
const usersController = require(__dirname+'/../controllers/resources/users_controller.js');
const externalAccountsController = require(__dirname+'/../controllers/resources/external_accounts_controller.js');
const externalTransactionsController = require(__dirname+'/../controllers/resources/external_transactions_controller.js');
const rippleAddressesController = require(__dirname+'/../controllers/resources/ripple_addresses_controller.js');
const rippleTransactionsController = require(__dirname+'/../controllers/resources/ripple_transactions_controller.js');

function ResourcesRouter(opts){

  var router = new express.Router;
  router.use(function() {
    return options.passport.authenticate(options.authName, {session: false });
  });

  router.post('/users', usersController.create);
  router.get('/users', usersController.index);
  router.get('/users/:id', usersController.show);

  router.post('/external_accounts', externalAccountsController.create);
  router.get('/external_accounts', externalAccountsController.index);
  router.get('/external_accounts/:id', externalAccountsController.show);
  router.put('/external_accounts/:id', externalAccountsController.update);
  router.delete('/external_accounts/:id', externalAccountsController.destroy);

  router.get('/external_transactions', externalTransactionsController.index);
  router.get('/external_transactions/:id', externalTransactionsController.show);

  router.get('/ripple_addresses', rippleAddressesController.index);
  router.get('/ripple_addresses/:id', rippleAddressesController.show);

  router.get('/ripple_transactions', rippleTransactionsController.index);
  router.get('/ripple_transactions/:id', rippleTransactionsController.show);

  router.get('/policies', policies.index);
  router.get('/policies/:id', policies.show);
  router.post('/policies', policies.create);
  router.put('/policies', policies.update);
  router.delete('/policies', policies.destroy);

  return router;
}

module.exports = ResourcesRouter;

