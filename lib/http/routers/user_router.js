var express = require('express');
var router = new express.Router();
var userCtrl = require(__dirname+'/../controllers/users/');
var publicCtrl = require(__dirname+'/../controllers/public/');

router.post('/users/login', publicCtrl.loginUser);
router.get('/users/:id', userCtrl.show);
router.get('/users/:id/external_accounts', userCtrl.externalAccounts);
router.get('/users/:id/external_transactions', userCtrl.externalTransactions);
router.get('/users/:id/ripple_addresses', userCtrl.rippleAddresses);
router.get('/users/:id/ripple_transactions', userCtrl.rippleTransactions);

module.exports = router;

