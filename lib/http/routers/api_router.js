var apiController = require(__dirname+'/../controllers/api/');

function ApiRouter(passport){
  this.passport = passport;
};

ApiRouter.prototype.bind = function(app){
  app.get('/v1/payments/incoming', apiController.listIncomingPayments);
  app.get('/v1/payments/outgoing', apiController.listOutgoingPayments);
  app.get('/v1/withdrawals', apiController.listWithdrawals);
  app.post('/v1/withdrawals/:id/clear', apiController.clearWithdrawal);
  app.post('/v1/wallets/hot/fund', apiController.fundHotWallet);
  app.post('/v1/deposits', apiController.recordDeposit);
  app.get('/v1/deposits', apiController.listDeposits);
  app.get('/v1/users', apiController.listUsers);
  app.get('/v1/users/:id/external_accounts', apiController.listUserExternalAccounts);
  app.post('/v1/registrations', apiController.registerUser);
  app.post('/v1/start', apiController.start);
  app.get('/v1/config/database', apiController.getDatabaseUrl);
  app.post('/v1/config/database', apiController.setDatabaseUrl);
  app.get('/v1/config/ripple/rest', apiController.getRippleRestUrl);
  app.post('/v1/config/ripple/rest', apiController.setRippleRestUrl);
  app.get('/v1/config/domain', apiController.getDomain);
  app.post('/v1/config/domain', apiController.setDomain);
  app.post('/v1/wallets/generate', apiController.generateWallet);
  app.post('/v1/config/wallets/hot', apiController.setHotWallet);
  app.get('/v1/config/wallets/hot', apiController.getHotWallet);
  app.post('/v1/config/wallets/cold', apiController.setColdWallet);
  app.get('/v1/config/wallets/cold', apiController.getColdWallet);
  app.post('/v1/wallets/hot/fund', apiController.fundHotWallet);
  app.get('/v1/config/key', apiController.getKey);
  app.post('/v1/config/key', apiController.setKey);
  app.get('/v1/currencies', apiController.listCurrencies);
  app.post('/v1/currencies', apiController.addCurrency);
  app.delete('/v1/currencies/:currency', apiController.removeCurrency);
  app.post('/v1/trust', apiController.setTrustLine);
  app.get('/v1/trust', apiController.getTrustLines);
  app.post('/v1/config/last_payment_hash', apiController.setLastPaymentHash);
  app.get('/v1/config/last_payment_hash', apiController.getLastPaymentHash);
  app.post('/v1/wallets/cold/refund', apiController.refundColdWallet);
  app.get('/v1/processes', apiController.listProcesses);
};

module.exports = ApiRouter;
