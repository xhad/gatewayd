var path     = require('path');
var gatewayd = require(path.join(__dirname, '/../../'));
var http     = require('supertest')(gatewayd.server);
var assert   = require('assert');

if (gatewayd.features.isEnabled('webfinger')) {
  describe('Webfinger lookup', function() {

    var address, account

    before(function(done) {
      address = 'steven@ripple.com';
      gatewayd.data.models.externalAccounts.findOrCreate({
        address: address,
        type: 'acct'
      }).then(function(record) {
        account = record;
        done();
      });
    });

    it('should look up an account from the ExternalAccounts', function(done) {
      http
        .get('/.well-known/webfinger.json?resource=acct:'+address)
        .end(function(error, response) {
          console.log(response.body);
          assert(response.body.subject, 'acct:'+address);
          assert(response.body.aliases instanceof Array);
          assert(response.body.links instanceof Array);
          assert(response.body.expires);
          done();
        });
    });
  });
}

