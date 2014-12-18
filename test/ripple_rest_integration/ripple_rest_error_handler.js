const chai = require('chai');
const rippleRestResponseFixtures = require(__dirname+'/../fixtures/ripple_rest_integration.js');
const rippleRestErrorHandler = require(__dirname+'/../../lib/ripple_rest_error_handler.js');

describe('Ripple Rest Error Handler', function(){
  it('should handle connection errors', function(done) {
    chai.assert.strictEqual(rippleRestErrorHandler.connection(rippleRestResponseFixtures.errors.connection.no_rippled_connection), 'retry');
    done();
  });

  it('should handle server errors', function(done) {
    chai.assert.strictEqual(rippleRestErrorHandler.server(rippleRestResponseFixtures.errors.server), 'retry');
    done();
  });

  it('should handle invalid_request error', function(done) {
    chai.assert.strictEqual(rippleRestErrorHandler.invalid_request(rippleRestResponseFixtures.errors.invalid_requests.no_paths_found), 'noPathsFound');
    done();
  });

  it('should not retry payment', function(done) {
    chai.assert.notStrictEqual(rippleRestErrorHandler.invalid_request(rippleRestResponseFixtures.errors.invalid_requests.no_paths_found), 'retry');
    done();
  });

  it('should handle transaction errors', function(done) {
    chai.assert.strictEqual(rippleRestErrorHandler.connection(rippleRestResponseFixtures.errors.connection.rippled_busy), 'retry');
    done();
  });

});
