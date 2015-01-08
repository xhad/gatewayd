var express = require('express');
var router = new express.Router();
var userCtrl = require(__dirname+'/../controllers/users/');
var publicCtrl = require(__dirname+'/../controllers/public/');

router.post('/login', publicCtrl.loginUser);
router.get('/:id', userCtrl.show);
router.get('/:id/external_accounts', userCtrl.externalAccounts);
router.get('/:id/external_transactions', userCtrl.externalTransactions);
router.get('/:id/ripple_addresses', userCtrl.rippleAddresses);
router.get('/:id/ripple_transactions', userCtrl.rippleTransactions);

module.exports = router;

