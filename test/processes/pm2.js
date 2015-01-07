var path       = require('path')
var Promise    = require('bluebird')
var pm2        = Promise.promisifyAll(require('pm2'))
var Supervisor = require(path.join(__dirname, '/../../lib/processes/supervisor'))
var gatewayd   = require(path.join(__dirname, '/../../'))
var assert     = require('assert')

describe('Starting Gatewayd processes with PM2', function() {

  before(function() {
    supervisor = new Supervisor()
  });

  it('should be able to remove or add processes', function() {
    assert.strictEqual(gatewayd.processes.toArray().length, 5)

    gatewayd.processes.remove('withdrawals')
    gatewayd.processes.remove('deposits')

    assert.strictEqual(gatewayd.processes.toArray().length, 3)

    gatewayd.processes.add('withdrawals')
    assert.strictEqual(gatewayd.processes.toArray().length, 4)

    gatewayd.processes.add('deposits')
    assert.strictEqual(gatewayd.processes.toArray().length, 5)
  })

  it('should first start the pm2 daemon then all 5 processes', function(done) {

    gatewayd.processes.remove('withdrawals')
    gatewayd.processes.remove('deposits')

    supervisor.start()
      .then(function(processes) {
        assert.strictEqual(processes.length, 3)
        done()
      })
      .error(done)
  })

  after(function(done) {
    supervisor.stop()
    setTimeout(done, 1000)
  })
})

