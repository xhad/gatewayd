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

## Activating A User ##
__`POST /v1/users/{:id}/activate`__

## Deactivating A User ##
__`POST /v1/users/{:id}/deactivate`__

## Creating A Deposit ##
__`POST /v1/deposits`__

## Listing Deposits ##
__`GET /v1/deposits`__

## Listing Outgoing Payments ##
__`GET /v1/payments/outgoing`__

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

