## Gateway API Server

This software is a database-backed web server that serves as a
back end for Ripple Gateway applications. A HTTP/JSON erver, Javascript library, and CLI are provided as interfaces to a deployed gateway.

The Ripple Gateway's features include: 
  - user registration 
  - deposits and withdrawals
  - issuing currency
  - ripple payment sending and monitoring
  - gateway administration

## Command Line Interface

    Usage: bin/gateway [options] [command]
  
    Commands:
  
      list_incoming_payments  list unprocesses incoming ripple payments
      list_withdrawals       get pending withdrawals to external accounts
      clear_withdrawal <external_transaction_id> clear pending withdrawal to external account
      fund_hot_wallet <amount> <currency> issue funds from cold wallet to hot wallet
      record_deposit <amount> <currency> <external_account_id> record a deposit in the deposit processing queue
      list_deposits          list deposits in the deposit processing queue
      list_outgoing_payments  list the outgoing ripple payments.
      list_users             list registered users
      register_user <username> <password> <ripple_address> create a user with a ripple address
      
    Usage: bin/config [options] [command]
    
    Options:
  
      -h, --help     output usage information

    Commands:

      set_postgres_url <url> set the url of the postgres database
      get_postgres_url       get the url of the postgres database
      set_ripple_rest_url <url> set the url of the ripple rest api
      get_ripple_rest_url    get the url of the ripple rest api
      set_domain <domain>    set the domain name of the gateway
      get_domain             get the domain name of the gateway
      generate_wallet        generate a random ripple wallet
      set_hot_wallet <address> <secret> set the gateway hot wallet
      get_hot_wallet         get the address of the gateway hot wallet
      get_hot_wallet_secret  get the secret of the gateway hot wallet
      set_cold_wallet <account> set the gateway hot wallet
      get_cold_wallet        get the gateway cold wallet
      set_key                set the admin api key
      get_key                get the admin api key
      list_currencies        List all currencies supported by the gateway
      add_currency <currency> add support for a currency
      remove_currency <currency> remove support for a currency
      set_trust <amount> <currency> set level of trust from hot to cold wallet
      get_trust_lines        get the trust lines from hot wallet to cold wallet
      set_last_payment_hash <hash> set the last encountered payment hash for incoming processing.
      get_last_payment_hash  get the last encountered payment hash for incoming processing.
      refund_cold_wallet <amount> <currency> send back funds from the hot wallet to cold wallet
    
    Options:
  
      -h, --help     output usage information
  
## Ripple Gateway Processes

The Ripple Gateway software is composed of a backed data store which serves as a queue for many types of processes that handle deposits and withdrawals of assets, and issuance and receipt of digital currency on ripple. In this post I will explain the various processes of a ripple gateway that together form an automated machine of gateway transaction processing. 

![Ripple Gateway Process Diagram](https://s3.amazonaws.com/imagesz/ripple_gateway_diagram.jpg)

In the diagram above each process is represented by a circle, and should be designed to scale horizontally, that is enable N processes of each type all operating on the same queues. Queues, represented by rectangles are actually SQL database tables maintained by the gateway data store.

## Process Flow of a Gateway Deposit

- Process 1: Recording Deposits

A banking API integration or manual human gateway operator receives the deposit of an asset and records the deposit in the ripple gateway data store. This process is designed to be implemented externally, and example implementations are provided by the command line interface and the http/json express.js server.

API calls: record_deposit

- Process 2: Deposit Business Logic
    
    node processes/deposits.js

A newly recorded deposit is handed to the business logic, which performs some function, ultimately en-queuing a corresponding ripple payment. This process is designed to be modified and customized.

API calls: list_deposits, enqueue_payment

-  Process 3: Send Outgoing Ripple Payments

    node processes/outgoing.js

A payment record resulting from the deposit business logic process is sent to the Ripple REST server, ultimately propagating to the network. This process is standard and should not be modified.

API calls: send_payment

## Process Flow of a Gateway Withdrawal

- Process 1: Record inbound Ripple payments

    node processes/incoming.js

Poll the Ripple REST server for new payment notifications to the gateway, and record the incoming payments in the ripple gateway data store. This process is standard and should not be modified.

API calls: get_payment_notification, record_payment

- Process 2: Withdrawal Business Logic

    node processes/withdrawals.js

A newly recorded incoming ripple payment is handed to the business logic, which performs some function, ultimately en-queuing a corresponding asset withdrawal record. This process is designed to be modified and customized.

API calls: enqueue_withdrawal

- Process 3: Clear Withdrawals

A banking API integration or manual human gateway operator reads the queue of pending withdrawals from the gateway data store, redeems the corresponding asset, and finally clears the withdrawal from the queue by updating the gateway data store. This process is designed to be implemented externally, and example implementations are provided by the command line interface and the http/json express.js server.

API calls: list_withdrawals, clear_withdrawal

## HTTP/JSON Server Core Interface

### Record Deposit

    curl -k --data "external_account_id=1&amount=1&currency=USD" http:/localhost:5000/api/v1/deposits
    {
      "deposit": {
        "external_account_id": 1,
        "currency": "USD",
        "amount": "1",
        "deposit": true,
        "status": "queued",
        "updatedAt": "2014-03-31T05:28:21.663Z",
        "createdAt": "2014-03-31T05:28:21.663Z",
        "id": 157,
        "ripple_transaction_id": null
      }
    }

### List Deposit Processing Queue

    curl -k http:/localhost:5000/api/v1/deposits
    {
      "deposits": [
        {
          "id": 160,
          "amount": "1",
          "currency": "USD",
          "deposit": true,
          "external_account_id": 1,
          "status": "queued",
          "ripple_transaction_id": null,
          "createdAt": "2014-03-31T05:38:27.237Z",
          "updatedAt": "2014-03-31T05:38:27.237Z"
        },
        {
          "id": 161,
          "amount": "117.2",
          "currency": "USD",
          "deposit": true,
          "external_account_id": 1,
          "status": "queued",
          "ripple_transaction_id": null,
          "createdAt": "2014-03-31T05:38:49.822Z",
          "updatedAt": "2014-03-31T05:38:49.822Z"
        }
      ]
    }

### List Outgoing Payments Queue

    curl -k http:/localhost:5000/api/v1/payments/outgoing
    {
      "payments": [
        {
          "id": 190,
          "to_address_id": 1,
          "from_address_id": 2,
          "transaction_state": "outgoing",
          "transaction_hash": null,
          "to_amount": "1",
          "to_currency": "USD",
          "to_issuer": "rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP",
          "from_amount": "1",
          "from_currency": "USD",
          "from_issuer": "rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP",
          "createdAt": "2014-03-31T05:37:07.964Z",
          "updatedAt": "2014-03-31T05:37:07.964Z"
        },
        {
          "id": 189,
          "to_address_id": 1,
          "from_address_id": 2,
          "transaction_state": "outgoing",
          "transaction_hash": null,
          "to_amount": "1",
          "to_currency": "USD",
          "to_issuer": "rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP",
          "from_amount": "1",
          "from_currency": "USD",
          "from_issuer": "rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP",
          "createdAt": "2014-03-31T05:36:32.094Z",
          "updatedAt": "2014-03-31T05:36:32.094Z"
        }
      ]
    }

### List Incoming Payment Processing Queue

    curl -k http://localhost:5000/api/v1/payments/incoming
    {
      "payments": [
        {
          "id": 195,
          "to_address_id": 0,
          "from_address_id": 2,
          "transaction_state": "incoming",
          "transaction_hash": "F7A679B94549C468F8E2251780F3A3968972F1FF952BAA6EAD59C8DE87212A73",
          "to_amount": "1.234567",
          "to_currency": "USD",
          "to_issuer": "coldWallet",
          "from_amount": "1.234567",
          "from_currency": "USD",
          "from_issuer": "coldWallet",
          "createdAt": "2014-03-31T06:08:47.922Z",
          "updatedAt": "2014-03-31T06:08:47.922Z"
        }
      ]
    }

### List Pending Withdrawals

    curl -k http://localhost:5000/api/v1/withdrawals
    {
      "withdrawals": [
        {
          "id": 162,
          "amount": "14.85",
          "currency": "USD",
          "deposit": false,
          "external_account_id": 1,
          "status": "pending",
          "ripple_transaction_id": 193,
          "createdAt": "2014-03-31T05:52:38.578Z",
          "updatedAt": "2014-03-31T05:52:38.578Z"
        }
      ]
    }

### Clear Pending Withdrawal

    curl -k -X POST http://localhost:5000/api/v1/withdrawals/162/clear
    {
      "withdrawal": {
        "id": 162,
        "amount": "14.85",
        "currency": "USD",
        "deposit": false,
        "external_account_id": 1,
        "status": "cleared",
        "ripple_transaction_id": 193,
        "createdAt": "2014-03-31T12:52:38.578Z",
        "updatedAt": "2014-03-31T05:55:49.425Z"
      }
    }

## Dependencies

1. Node.js
  - The express web module is used to serve HTTP/JSON endpoints
  - A Basic Auth strategy is used for authentication of users, admin.
  - Important NPM modules include: passport, db-migrate, sequelize, ripple-lib, pg, nconf, commander, bignumber.js, validator, and mocha

2. Postgres
  - The easiest way to get started with Postgres is by launching a [free database hosted by Heroku](https://postgres.heroku.com/databases)
  - For local development on Mac the simplest installation is via the [Postgres App](http://postgresapp.com/) by Heroku.
  - On Ubuntu, [install and configure Postgres](https://help.ubuntu.com/community/PostgreSQL) using the aptitude package manager and the psql tool.

3. [Ripple REST API](https://github.com/ripple/ripple-rest.git)
  - The Ripple REST API provides a simplified HTTP/JSON interface to all the Ripple protocol network operations, such as payments and other transactions.

## Installation

The gateway server software requires git, g++, make, nodejs, postgres, and several npm modules.

- Detailed [installation instructions](./doc/install.md) for Ubuntu 13.10

