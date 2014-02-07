# Ripple Gateway REST API

A simplified RESTful API for running a the [Ripple Network](http://ripple.com).

## Bugs

__This API is still in beta.__ Please open issues for any problems you encounter.

## Available Resources

1. [Users](#1-users)
    + [`POST  /api/v1/users`](#post-apiv1users)
    + [`GET  /api/v1/users`](#get-apiv1users)
2. [External Accounts](#2-externalaccounts)
    + [`GET  /api/v1/users/:id/external_accounts`](#get-apiv1externalaccounts)
    + [`POST  /api/v1/external_accounts`](#get-apiv1externalaccounts)
3. [Deposits](#3-deposits)
    + [`POST  /api/v1/deposits/`](#post-deposits)
4. [Withdrawals](#4-external_withdrawals)
    + [`GET  /api/v1/withdrawals/pending`](#get-apiv1pending)
    + [`POST /api/v1/withdrawals/:id/clear`](#post-apiv1withdrawalsidclear)
5. [Balances](#5-balances)
    + [`GET  /api/v1/users/:id/balances`](#get-apiv1balances)
6. [Ripple Addresses](#6-ripple_addresses)
    + [`GET  /api/v1/users/:id/ripple_addresses`](#get-apiv1status)
7. [Ripple Transactions](#7-server-info)
    + [`GET  /api/v1/users/:id/ripple_transactions`](#get-apiv1status)
8. [Gateway Settings](#8-settings)
    + [`GET  /api/v1/settings`](#get-apiv1settings)



### 1. Users

__________

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
__________

### 3. Deposits
__________

### 4. Withdrawals
__________

### 5. Balances
__________

### 6. Ripple Addresses
__________

### 7. Ripple Payments
__________

### 8. Ripple Payments
__________



