var http         = require('superagent');
var Promise      = require('bluebird');
var rippleQuotes = require(__dirname+'/../api/ripple_quotes');

function destinationRippleQuote(address, amount, currency) {
  console.log('QUOTE', address, amount, currency);
  return rippleQuotes.getOutgoing({
    destination: {
      address: address,
      amount: amount,
      currency: currency
    }
  })
}

function parseAddress(address) {
  var segments = address.split('@');
  if (segments.length < 2) {
    throw new Error('local lookup not implemented');
  }
  var domain = segments.pop();
  var identifier = segments.join('@');

  return {
    domain: domain,
    identifier: identifier
  }
}

function destinationQuote(address, amount, currency) {
  return new Promise(function(resolve, reject) {
    var parsed = parseAddress(address);
    var domain = parsed.domain;
    var url = 'https://'+domain+'/v1/bridge_quotes/'+address+'/'+amount+'+'+currency;
    http
      .get(url)
      .end(function(error, response) {
        if (error) {
          reject(new Error(error));
        } else {
          if (response.statusCode !== 200) {
            return reject(new Error(response.body.error));
          } else {
            resolve(response.body);
          }
        }
      });
  });
}

function destinationWebfinger(domain, identifier) {
  return new Promise(function(resolve, reject) {
    var url = 'https://'+domain+'/.well-known/webfinger.json?resource=acct:'+identifier;
    console.log('GET URL', url);
    http
      .get(url)
      .end(function(error, response) {
        if (error) {
          reject(new Error(error));
        } else if (response.statusCode !== 200) {
          reject(new Error(response.error));
        } else {
          resolve(response.body);
        }
      });
  });
}

module.exports = {
  parseAddress: parseAddress,
  destinationQuote: destinationQuote,
  destinationWebfinger: destinationWebfinger,
  destinationRippleQuote: destinationRippleQuote
}

