var protocol = require(__dirname+'/../').protocol;
var assert   = require('assert');

describe('Gateway Services Protocol', function() {

  it('should parse a phone number at a domain', function() {

    var parsed = protocol.parseAddress('14154072789@coin-gate.gatewayzen.com')
    assert.strictEqual(parsed.identifier, '14154072789');
    assert.strictEqual(parsed.domain, 'coin-gate.gatewayzen.com');
  });


  it('should parse an email address at a domain', function() {

    var parsed = protocol.parseAddress('me@stevenzeiler.com@coin-gate.gatewayzen.com')
    assert.strictEqual(parsed.identifier, 'me@stevenzeiler.com');
    assert.strictEqual(parsed.domain, 'coin-gate.gatewayzen.com');
  });
});

