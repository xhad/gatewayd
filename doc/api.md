# Ripple Gateway HTTP API

A API for managing deposits, withdrawals, and hosted wallets at Ripple Gateways.

1. [Users](#1-users)
    + [`POST  /api/v1/users`](#post-apiv1users)
    + [`GET  /api/v1/users`](#get-apiv1users)
2. [External Accounts](#2-externalaccounts)
    + [`GET  /api/v1/external_accounts`](#get-apiv1externalaccounts)
    + [`POST  /api/v1/external_accounts`](#get-apiv1externalaccounts)
3. [Deposits](#3-deposits)
    + [`POST  /api/v1/deposits`](#post-deposits)
4. [Withdrawals](#4-external_withdrawals)
    + [`GET  /api/v1/withdrawals/pending`](#get-apiv1pending)
    + [`POST /api/v1/withdrawals/:id/clear`](#post-apiv1withdrawalsidclear)
5. [Balances](#5-balances)
    + [`GET  /api/v1/balances`](#get-apiv1balances)
6. [Ripple Addresses](#6-ripple-addresses)
    + [`GET  /api/v1/ripple_addresses`](#get-apiv1ripple_addresses)
    + [`POST  /api/v1/ripple_addresses`](#post-apiv1ripple_addresses)
7. [Ripple Payments](#7-server-info)
    + [`GET  /api/v1/payments`](#get-apiv1payments)
    + [`POST  /api/v1/payments`](#get-apiv1payments)
    + [`PUT  /api/v1/payments/:id`](#put-apiv1paymentsid)
8. [Gateway Settings](#8-settings)
    + [`GET  /api/v1/settings`](#get-apiv1settings)

### 1. Users

#### POST /api/v1/users

Create a user with default hosted wallet using Basic Auth.

#### GET /api/v1/users

Get a user using their credentials in Basic Auth

Response:
```js
{
    "user": {
      "id": 2,
      "name": "stevenzeiler",
      "salt": "e22df1bb8cf08b97567a06ef24135de44bfd4bb595a2d832074de55d25c65376",
      "federation_tag": null,
      "admin": false,
      "federation_name": null,
      "password_hash": "70d68e466b7affe78010f29e7e875842ad3a6ca54747560c6b0c60a2d6920850",
      "bank_account_id": null,
      "kyc_id": null,
      "createdAt": "2014-01-24T08:56:22.590Z",
      "updatedAt": "2014-01-24T08:56:22.590Z",
      "external_id": null
    }
}
```
__________

### 2. External Accounts

#### POST /api/v1/external_accounts

Request
```js
{
    "name": 'Wells Fargo'
}
```

Response
```js
{
  "account": {
    "name": "Wells Fargo",
    "user_id": 2,
    "updatedAt": "2014-02-08T05:55:02.510Z",
    "createdAt": "2014-02-08T05:55:02.510Z",
    "id": 55
  }
}
```


#### GET /api/v1/external_accounts

Response
```js
{
  "external_accounts": [
    {
      "id": 4,
      "name": "Default",
      "user_id": 2,
      "createdAt": "2014-01-24T08:59:43.814Z",
      "updatedAt": "2014-01-24T08:59:43.815Z"
    }
  ]
}
```

__________

### 3. Deposits

#### POST /api/v1/deposits
#### GET /api/v1/withdrawals
__________

### 4. Withdrawals

#### POST /api/v1/withdrawals
#### GET /api/v1/withdrawals
#### GET /api/v1/withdrawals/pending
#### POST /api/v1/withdrawals/:id/clear
__________

### 5. Balances

#### GET /api/v1/balances

response

```js
{
  "balances": [
    {
      "currency": "MXN",
      "amount": "20819"
    },
    {
      "currency": "USD",
      "amount": "14.676"
    },
    {
      "currency": "JPY",
      "amount": "1870.89"
    },
    {
      "currency": "XAG",
      "amount": "300"
    }
  ]
}
```
__________

### 6. Ripple Addresses

#### GET /api/v1/ripple_addresses
```js
{
  "ripple_addresses": [
    {
      "id": 3,
      "user_id": 2,
      "managed": true,
      "address": "rNeSkJhcxDaqzZCAvSfQrxwPJ2Kjddrj4a",
      "type": "hosted",
      "tag": "2",
      "secret": null,
      "previous_transaction_hash": null,
      "createdAt": "2014-01-24T08:56:23.858Z",
      "updatedAt": "2014-01-24T08:56:23.858Z"
    }
  ]
}
```

#### POST /api/v1/ripple_addresses

request
```js
{
  "user_id":"2"
  "address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
  "type":"independent",
  "managed": false
}
```

response
```js
{
  "ripple_address": {
    "user_id": 2,
    "address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
    "tag": null,
    "managed": false,
    "type": "independent",
    "updatedAt": "2014-02-09T23:25:02.748Z",
    "createdAt": "2014-02-09T23:25:02.748Z",
    "id": 181,
    "secret": null,
    "previous_transaction_hash": null
  }
}
```
__________

### 7. Ripple Payments

#### GET /api/v1/payments
#### POST /api/v1/payments
#### PUT /api/v1/payments/:id
__________

### 8. Gateway Settings

#### GET /api/v1/settings
__________

