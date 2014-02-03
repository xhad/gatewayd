# Ripple Gateway HTTP Node.js Client

I provide a complete HTTP wrapper library for interacting with the Gateway API REST server.
For now the library is available at lib/ripple.js, but it will be extracted into a separate
NPM module as soon as reasonably possible.

## Configuration

    var GatewayClient = require('./lib/ripple.js');
    var client = new GatewayClient({
      api: 'http://localhost:4000'
    });

To make a call to the Gateway API requires authentication by a gateway user or the admin.
All authentication is handled underneath using Basic Auth, but the library abstracts this
by exposing configuration options for `user` and `password`.

    var client = new GatewayClient({
      api: 'http://localhost:4000',
      user: 'stevenzeiler',
      secret: 'someSuperS3cretp@ssword'
    });

Or you can configure the user and secret on the fly by modifying the client's properties.

    client.user = 'admin';
    client.secret = '6a71e53d46d63ba471081dc62a8ff6be4c64117a4fbb4098a56e1c6db208dfa4';

## API

The library provides a wrapper for each of the possible REST calls.

All calls provide a callback function with two parameters, error and response.

- getSettings(opts, fn)
- getUsers(opts, fn)
- createUser(opts, fn)
- getExternalAccounts(opts, fn)
- createExternalAccount(opts, fn)
- createDeposit(opts, fn)
- createWithdrawal(opts, fn)
- getPendingWithdrawal(opts, fn)
- clearWithdrawal(opts, fn)
- getExternalTransactions(opts, fn)
- getBalances(opts, fn)
- getRippleAddresses(opts, fn)
- createRippleAddress(opts, fn)
- getRippleTransactions(opts, fn)
- createRippleTransaction(opts, fn)
- getPendingRippleTransactions(opts, fn)


