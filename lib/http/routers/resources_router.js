const express = require('express');
const usersController = require(__dirname+'/../controllers/resources/users_controller.js');
const externalAccountsController = require(__dirname+'/../controllers/resources/external_accounts_controller.js');
const externalTransactionsController = require(__dirname+'/../controllers/resources/external_transactions_controller.js');
const rippleAddressesController = require(__dirname+'/../controllers/resources/ripple_addresses_controller.js');
const rippleTransactionsController = require(__dirname+'/../controllers/resources/ripple_transactions_controller.js');
const policiesController = require(__dirname+'/../controllers/resources/policies_controller.js');

var router = new express.Router;

router.post('/users', usersController.create);
router.get('/users', usersController.index);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.destroy);

router.post('/external_accounts', externalAccountsController.create);
router.get('/external_accounts', externalAccountsController.index);
router.get('/external_accounts/:id', externalAccountsController.show);
router.put('/external_accounts/:id', externalAccountsController.update);
router.delete('/external_accounts/:id', externalAccountsController.destroy);

router.post('/external_transactions', externalTransactionsController.create);
router.get('/external_transactions', externalTransactionsController.index);
router.get('/external_transactions/:id', externalTransactionsController.show);
router.put('/external_transactions/:id', externalTransactionsController.update);
router.delete('/external_transactions/:id', externalTransactionsController.destroy);

router.get('/ripple_addresses', rippleAddressesController.index);
router.get('/ripple_addresses/:id', rippleAddressesController.show);
router.post('/ripple_addresses', rippleAddressesController.create);
router.put('/ripple_addresses', rippleAddressesController.update);
router.delete('/ripple_addresses', rippleAddressesController.destroy);

router.get('/ripple_transactions', rippleTransactionsController.index);
router.get('/ripple_transactions/:id', rippleTransactionsController.show);
router.post('/ripple_transactions', rippleTransactionsController.create);
router.put('/ripple_transactions', rippleTransactionsController.update);
router.delete('/ripple_transactions', rippleTransactionsController.destroy);

router.get('/policies', policiesController.index);
router.get('/policies/:id', policiesController.show);
router.post('/policies', policiesController.create);
router.put('/policies', policiesController.update);
router.delete('/policies', policiesController.destroy);

module.exports = router;

