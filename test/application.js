var Gatewayd = require(__dirname+'/../');

describe('application', function() {

  it('should start a new express server', function(done) {

    var application = new Gatewayd.Application();

    application.start();
  })
})

