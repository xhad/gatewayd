`gatewayd : v3.19.0`

## Gatewayd API ##


## Available API Routes ##

* [`POST /v1/registrations`](#registering-a-user)
* [`POST /v1/users/{:id}/activate`](#activating-a-user)
* [`POST /v1/users/{:id}`](#deactivating-a-user)
* [`POST /v1/deposits/`](#creating-a-deposit)
* [`GET /v1/deposits`](#listing-deposits)
* [`GET /v1/payments/outgoing`](#listing-outgoing-payments)
* [`GET /v1/payments/failed`](#listing-failed-payments)
* [`POST /v1/payments/failed/{:id}/retry`](#retrying-a-failed-payment)
* [`GET /v1/payments/incoming`](#listing-incoming-payments)
* [`GET /v1/withdrawals`](#listing-withdrawals)
* [`POST /v1/withdrawals/{:id}/clear`](#clearing-a-withdrawal)
* [`GET /v1/cleared`](#listing-cleared-external-transactions)
* [`GET /v1/balances`](#listing-hot-wallet-balances)
* [`GET /v1/liabilities`](#listing-cold-wallet-liabilities)

## User-Auth API Routes

* [`POST /v1/register`](#registering-a-user)
* [`POST /v1/users/login`](#logging-in-a-user)
* [`GET /v1/users/{:id}`](#showing-a-user)
* [`GET /v1/users/{:id}/external_accounts`](#listing-user-external-accounts)
* [`GET /v1/users/{:id}/external_transactions`](#listing-user-external-transactions)
* [`GET /v1/users/{:id}/ripple_addresses`](#listing-user-ripple-addresses)
* [`GET /v1/users/{:id}/ripple_transactions`](#listing-user-ripple-transactions)

## Admin Configuration API Routes

* [`POST /v1/wallets/hot/fund`](#funding-the-hot-wallet)
* [`POST /v1/config/database`](#setting-the-database-url)
* [`GET /v1/config/database`](#showing-the-database-url)
* [`POST /v1/config/ripple/rest`](#setting-the-ripple-rest-url)
* [`GET /v1/config/ripple/rest`](#showing-the-ripple-rest-url)
* [`POST /v1/config/wallets/cold`](#setting-the-cold-wallet)
* [`GET /v1/config/wallets/cold`](#showing-the-cold-wallet)
* [`POST /v1/config/wallets/generate`](#generating-a-ripple-wallet)
* [`POST /v1/config/wallets/hot`](#setting-the-hot-wallet)
* [`GET /v1/config/wallets/hot`](#showing-the-hot-wallet)
* [`POST /v1/trust`](#setting-trust-from-hot-wallet-to-cold-wallet)
* [`GET /v1/trust`](#listing-trust-from-hot-wallet-to-cold-wallet)
* [`POST /v1/wallets/hot/fund`](#funding-the-hot-wallet)
* [`POST /v1/config/last_payment_hash`](#setting-the-last-payment-hash)
* [`GET /v1/config/last_payment_hash`](#showing-the-last-payment-hash)
* [`POST /v1/config/domin`](#setting-the-domain)
* [`GET /v1/config/domain`](#showing-the-domain)
* [`POST /v1/config/key`](#setting-the-api-key)
* [`GET /v1/config/key`](#showing-the-api-key)
* [`POST /v1/currencies`](#setting-currencies)
* [`GET /v1/currencies`](#listing-currencies)
* [`POST /v1/wallets/cold/refund`](#sending-funds-from-hot-wallet-to-cold-wallet)
* [`POST /v1/start`](#starting-worker-processes)
* [`POST /v1/processes`](#listing-current-processes)

## API Overview ##

## Registering A User ##
__`POST /v1/registrations`__
Request:
    {
      "name": "steven@ripple.com",
      "password": "s0m3supe&$3cretp@s$w0r*",
      "ripple_address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk"
    }
Response:
    {
      "user": {
        "name": "steven@ripple.com",
        "salt": "63a5f6fc48addb712ec8940ff591d742f57f0c4f7058d2040714bd260c4d93e0",
        "password_hash": "86e3b615a72b6f6c56f36dc6657d3133c747a59e8da8e6304c20f3229098f21e",
        "active": false,
        "updatedAt": "2014-06-12T00:43:17.572Z",
        "createdAt": "2014-06-12T00:43:17.572Z",
        "id": 508,
        "federation_tag": null,
        "admin": null,
        "federation_name": null,
        "bank_account_id": null,
        "kyc_id": null,
        "external_id": null,
        "data": null,
        "uid": null,
        "ripple_address": {
          "data": null,
          "user_id": 508,
          "address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "managed": false,
          "type": "independent",
          "updatedAt": "2014-06-12T00:43:17.613Z",
          "createdAt": "2014-06-12T00:43:17.613Z",
          "id": 647,
          "tag": null,
          "secret": null,
          "previous_transaction_hash": null,
          "uid": null
        },
        "external_account": {
          "data": null,
          "name": "default",
          "user_id": 508,
          "updatedAt": "2014-06-12T00:43:17.620Z",
          "createdAt": "2014-06-12T00:43:17.620Z",
          "id": 307,
          "uid": null
        },
        "hosted_address": {
          "data": null,
          "user_id": 508,
          "address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "managed": true,
          "type": "hosted",
          "tag": 307,
          "updatedAt": "2014-06-12T00:43:17.627Z",
          "createdAt": "2014-06-12T00:43:17.627Z",
          "id": 648,
          "secret": null,
          "previous_transaction_hash": null,
          "uid": null
        }
      }
    }

## Activating A User ##
__`POST /v1/users/{:id}/activate`__
response:
    {
      "user": {
        "id": 508,
        "name": "steven@ripple.com",
        "salt": "63a5f6fc48addb712ec8940ff591d742f57f0c4f7058d2040714bd260c4d93e0",
        "federation_tag": null,
        "admin": null,
        "federation_name": null,
        "password_hash": "86e3b615a72b6f6c56f36dc6657d3133c747a59e8da8e6304c20f3229098f21e",
        "bank_account_id": null,
        "kyc_id": null,
        "createdAt": "2014-06-12T07:43:17.572Z",
        "updatedAt": "2014-06-12T00:44:05.786Z",
        "external_id": null,
        "data": null,
        "uid": null,
        "active": true
      }
    }

## Deactivating A User ##
__`POST /v1/users/{:id}/deactivate`__
    {
      "user": {
        "id": 508,
        "name": "steven@ripple.com",
        "salt": "63a5f6fc48addb712ec8940ff591d742f57f0c4f7058d2040714bd260c4d93e0",
        "federation_tag": null,
        "admin": null,
        "federation_name": null,
        "password_hash": "86e3b615a72b6f6c56f36dc6657d3133c747a59e8da8e6304c20f3229098f21e",
        "bank_account_id": null,
        "kyc_id": null,
        "createdAt": "2014-06-12T14:43:17.572Z",
        "updatedAt": "2014-06-12T00:44:52.919Z",
        "external_id": null,
        "data": null,
        "uid": null,
        "active": false
      }
    }

## Creating A Deposit ##
__`POST /v1/deposits`__
request:
    {
      "external_account_id": 307,
      "currency": "BTC"
      "amount": "10.7"
    }

response:
    {
      "deposit": {
        "data": null,
        "external_account_id": 307,
        "currency": "BTC",
        "amount": "10.7",
        "deposit": true,
        "status": "queued",
        "updatedAt": "2014-06-12T00:46:02.080Z",
        "createdAt": "2014-06-12T00:46:02.080Z",
        "id": 1,
        "ripple_transaction_id": null,
        "uid": null
      }
    }

## Listing Deposits ##
__`GET /v1/deposits`__
response:
    {
      "deposits": [
        {
          "data": null,
          "id": 1,
          "amount": "10.7",
          "currency": "BTC",
          "deposit": true,
          "external_account_id": 307,
          "status": "queued",
          "ripple_transaction_id": null,
          "createdAt": "2014-06-12T00:46:02.080Z",
          "updatedAt": "2014-06-12T00:46:02.080Z",
          "uid": null
        },
        {
          "data": null,
          "id": 2,
          "amount": "281.2",
          "currency": "XAG",
          "deposit": true,
          "external_account_id": 307,
          "status": "queued",
          "ripple_transaction_id": null,
          "createdAt": "2014-06-12T00:47:24.754Z",
          "updatedAt": "2014-06-12T00:47:24.754Z",
          "uid": null
        }
      ]
    }

## Listing Outgoing Payments ##
__`GET /v1/payments/outgoing`__
    {
      "payments": [
        {
          "data": null,
          "id": 1,
          "to_address_id": 647,
          "from_address_id": 623,
          "transaction_state": null,
          "transaction_hash": null,
          "to_amount": "10.593",
          "to_currency": "BTC",
          "to_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "from_amount": "10.593",
          "from_currency": "BTC",
          "from_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "createdAt": "2014-06-12T00:48:02.302Z",
          "updatedAt": "2014-06-12T00:48:02.302Z",
          "uid": null,
          "client_resource_id": "false",
          "state": "outgoing",
          "external_transaction_id": 1
        },
        {
          "data": null,
          "id": 2,
          "to_address_id": 647,
          "from_address_id": 623,
          "transaction_state": null,
          "transaction_hash": null,
          "to_amount": "278.388",
          "to_currency": "XAG",
          "to_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "from_amount": "278.388",
          "from_currency": "XAG",
          "from_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "createdAt": "2014-06-12T00:48:02.324Z",
          "updatedAt": "2014-06-12T00:48:02.324Z",
          "uid": null,
          "client_resource_id": "false",
          "state": "outgoing",
          "external_transaction_id": 2
        }
      ]
    }

## Listing Failed Payments ##
__`GET /v1/payments/failed`__

## Retrying A Failed Payment ##
__`POST /v1/payments/failed/{:id}/retry`__

## Listing Incoming Payments ##
__`GET /v1/payments/incoming`__

## Listing Withdrawals ##
__`GET /v1/withdrawals`__

## Clearing A Withdrawal ##
__`POST /v1/withdrawals/{:id}/clear`__

## Listing Cleared External Transactions ##
__`GET /v1/cleared`__

## Listing Hot Wallet Balances ##
__`GET /v1/balances`__

## Listing Cold Wallet Liabilities ##
__`GET /v1/liabilities`__

## Registering A User ##
__`POST /v1/register`__

## Logging In A User ##
__`POST /v1/users/login`__

## Showing A User ##
__`GET /v1/users/{:id}`__

## Listing User External Accounts ##
__`GET /v1/users/{:id}/external_accounts`__

## Listing User External Transactions ##
__`GET /v1/users/{:id}/external_transactions`__

## Listing User Ripple Addresses ##
__`GET /v1/users/{:id}/ripple_addresses`__

## Listing User Ripple Transactions ##
__`GET /v1/users/{:id}/ripple_transactions`__

## Funding The Hot Wallet ##
__`POST /v1/wallets/hot/fund`__

## Setting The Database Url ##
__`POST /v1/config/database`__

## Showing The Database Url ##
__`GET /v1/config/database`__

## Setting The Ripple Rest Url ##
__`POST /v1/config/ripple/rest`__

## Showing The Ripple Rest Url ##
__`GET /v1/config/ripple/rest`__

## Setting The Cold Wallet ##
__`POST /v1/config/wallets/cold`__

## Showing The Cold Wallet ##
__`GET /v1/config/wallets/cold`__

## Generating A Ripple Wallet ##
__`POST /v1/config/wallets/generate`__

## Setting The Hot Wallet ##
__`POST /v1/config/wallets/cold`__

## Showing The Hot Wallet ##
__`POST /v1/config/wallets/cold`__

## Setting Trust From Hot Wallet To Cold Wallet ##
__`POST /v1/trust`__

## Listing Trust From Hot Wallet To Cold Wallet ##
__`GET /v1/trust`__

## Funding The Hot Wallet ##
__`POST /v1/wallets/hot/fund`__

## Setting The Last Payment Hash ##
__`POST /v1/config/last_payment_hash`__

## Showing The Last Payment Hash ##
__`GET /v1/config/last_payment_hash`__

## Setting The Domain ##
__`POST /v1/config/domain`__

## Showing The Domain ##
__`GET /v1/config/domain`__

## Setting The Api Key ##
__`POST /v1/config/key`__

## Showing The Api Key ##
__`GET /v1/config/key`__

## Setting Currencies ##
__`POST /v1/currencies`__

## Listing Currencies ##
__`GET /v1/currencies`__

## Sending Funds From Hot Wallet To Cold Wallet ##
__`POST /v1/wallets/cold/refund`__

## Starting Worker Processes ##
__`POST /v1/start`__

## Listing Current Processes ##
__`GET /v1/processes`__

