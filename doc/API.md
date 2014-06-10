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

## Activating A User ##

## Deactivating A User ##

## Creating A Deposit ##

## Listing Deposits ##

## Listing Outgoing Payments ##

## Listing Failed Payments ##

## Retrying A Failed Payment ##

## Listing Incoming Payments ##

## Listing Withdrawals ##

## Clearing A Withdrawal ##

## Listing Cleared External Transactions ##

## Listing Hot Wallet Balances ##

## Listing Cold Wallet Liabilities ##

## Registering A User ##

## Logging In A User ##

## Showing A User ##

## Listing User External Accounts ##

## Listing User External Transactions ##

## Listing User Ripple Addresses ##

## Listing User Ripple Transactions ##

## Funding The Hot Wallet ##

## Setting The Database Url ##

## Showing The Database Url ##

## Setting The Ripple Rest Url ##

## Showing The Ripple Rest Url ##

## Setting The Cold Wallet ##

## Showing The Cold Wallet ##

## Generating A Ripple Wallet ##

## Setting The Hot Wallet ##

## Showing The Cold Wallet ##

## Setting Trust From Hot Wallet To Cold Wallet ##

## Listing Trust From Hot Wallet To Cold Wallet ##

## Funding The Hot Wallet ##

## Setting The Last Payment Hash ##

## Showing The Last Payment Hash ##

## Setting The Domain ##

## Showing The Domain ##

## Setting The Api Key ##

## Showing The Api Key ##

## Setting Currencies ##

## Listing Currencies ##

## Sending Funds From Hot Wallet To Cold Wallet ##

## Starting Worker Processes ##

## Listing Current Processes ##

