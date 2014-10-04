const Promise = require('bluebird');
const config = require(__dirname+'/../../config/config.js');
const http = require('superagent');

module.exports = function fetchLastPaymentHash() {
  return new Promise(function(resolve,reject) {
    http
      .get(config.get('RIPPLE_REST_API')+'v1/accounts/'+config.get('COLD_WALLET')+'/payments')
      .end(function(error, response) {
        if (error) { return reject(error) }
        resolve(response.body.payments[0].payment.hash);
      });
  });
}

