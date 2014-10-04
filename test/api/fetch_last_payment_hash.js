const gatewayd = require(__dirname+'/../../');
const assert = require('assert');

describe('api.fetchLastPaymentHash', function() {

  it('should return the most recent payment hash of the cold wallet', function(done) {
    gatewayd.api.fetchLastPaymentHash().then(function(hash) {
      assert(hash);
      console.log('FETCHED LAST HASH FOR COLD WALLET', hash);
      done();
    })
    .error(function(error) {
      console.log('error', error);
      assert(false);
    });
  });
});

