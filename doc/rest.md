# Ripple Gateway REST API

A simplified RESTful API for running a the [Ripple Network](http://ripple.com).

## Bugs

__This API is still in beta.__ Please open issues for any problems you encounter.

## Available Resources

1. [Users](#1-users)
    + [`POST  /api/v1/users`](#post-apiv1users)
2. [External Accounts](#2-externalaccounts)
    + [`GET  /api/v1/users/:id/external_accounts`](#get-apiv1externalaccounts)
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



### 1. Notifications

__________

#### GET /api/v1/addresses/:address/next_notification

Get the most recent notification for a particular account. See next route details for response format.


__________

#### GET /api/v1/addresses/:address/next_notification/:prev_tx_hash

Get the next notification after the given `:prev_tx_hash` for a particular accounts.

Response:
```js
{
    "success": true,
    "notification": {
        "address": "rKXCummUHnenhYudNb9UoJ4mGBR75vFcgz",
        "type": "payment",
        "tx_direction": "outgoing",
        "tx_state": "confirmed",
        "tx_result": "tesSUCCESS",
        "tx_ledger": 4696959,
        "tx_hash": "55BA3440B1AAFFB64E51F497EFDF2022C90EDB171BBD979F04685904E38A89B7",
        "tx_timestamp": 1391025100000,
        "tx_url": "http://ripple-simple.herokuapp.com/api/v1/addresses/rKXCummUHnenhYudNb9UoJ4mGBR75vFcgz/payments/55BA3440B1AAFFB64E51F497EFDF2022C90EDB171BBD979F04685904E38A89B7",
        "confirmation_token": "55BA3440B1AAFFB64E51F497EFDF2022C90EDB171BBD979F04685904E38A89B7"
    }
}
```
Or if there are no new notifications:

(Note the `"type": "none"` and `"tx_state": "empty"` or `"tx_state": "pending"`)
```js
{
    "success": true,
    "notification": {
        "address": "rKXCummUHnenhYudNb9UoJ4mGBR75vFcgz",
        "type": "none",
        "tx_direction": "",
        "tx_state": "empty", // or "pending" if still waiting for outgoing transactions to clear
        "tx_result": "",
        "tx_ledger": "",
        "tx_hash": "",
        "tx_timestamp": ,
        "tx_url": "",
        "confirmation_token": ""
    }
}
```

__________

### 2. Payments


__________




