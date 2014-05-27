## Ripple Gateway Framework

![Travis CI Build Status](https://api.travis-ci.org/ripple/gatewayd.svg)

This software is a framework for building and deploying a Ripple Gateway software system. The system includes a core database that manages accounting for deposits and withdrawals of assets to the Ripple network. The Ripple Gateway Framework provides a standard interface for issuing any currency on the Ripple network and exchange, with the goal of completely abstracting interaction with Ripple.

Interact with the Ripple Gateway Framework by building custom integrations with banking and payment systems around the world, and by using the built-in APIs for designing beautiful gateway mobile apps and user interfaces. A HTTP/JSON server, Javascript library, and Command Line Interface are provided as interfaces to the Ripple Gateway Framework software.

The Ripple Gateway's features include: 
  - user registration 
  - deposits and withdrawals
  - issuing currency
  - ripple payment sending and monitoring
  - gateway administration

## Dependencies

1. Node.js
  - The express web module is used to serve HTTP/JSON endpoints
  - A Basic Auth strategy is used for authentication of users, admin.
  - Several NPM modules must be globally installed: db-migrate, pg, forever, and mocha

2. Postgres
  - The easiest way to get started with Postgres is by launching a [free database hosted by Heroku](https://postgres.heroku.com/databases)
  - For local development on Mac the simplest installation is via the [Postgres App](http://postgresapp.com/) by Heroku.
  - On Ubuntu, [install and configure Postgres](https://help.ubuntu.com/community/PostgreSQL) using the aptitude package manager and the psql tool.

3. [Ripple REST API](https://github.com/ripple/ripple-rest.git)
  - The Ripple REST API provides a simplified HTTP/JSON interface to all the Ripple protocol network operations, such as payments and other transactions.

## Installation

The gateway server software requires git, g++, make, nodejs, postgres, and several npm modules.

- Comprehensive [installation script](./doc/install.md) for Ubuntu

## Setup

Once ripple-gateway is installed, [configure your gateway](./doc/setup.md) wallets and server


## Running the Ripple Gateway

After installation, start the gateway processes by running the command:

    bin/gateway start


## Command Line Interface

    Usage: bin/gateway [options] [command]
  
    Commands:
  
      register_user <username> <password> <ripple_address> create a user with a ripple address
      list_users             list registered users
      record_deposit <amount> <currency> <external_account_id> record a deposit in the deposit processing queue
      list_deposits          list deposits in the deposit processing queue
      list_outgoing_payments  list the outgoing ripple payments.
      list_incoming_payments  list unprocesses incoming ripple payments
      list_withdrawals       get pending withdrawals to external accounts
      clear_withdrawal <external_transaction_id> clear pending withdrawal to external account

      generate_wallet        generate a random ripple wallet
      set_hot_wallet <address> <secret> set the gateway hot wallet
      get_hot_wallet         get the address of the gateway hot wallet
      get_hot_wallet_secret  get the secret of the gateway hot wallet
      fund_hot_wallet <amount> <currency> issue funds from cold wallet to hot wallet
      set_cold_wallet <account> set the gateway hot wallet
      get_cold_wallet        get the gateway cold wallet
      refund_cold_wallet <amount> <currency> send back funds from the hot wallet to cold wallet
      
      set_trust <amount> <currency> set level of trust from hot to cold wallet
      get_trust_lines        get the trust lines from hot wallet to cold wallet

      list_currencies        List all currencies supported by the gateway
      add_currency <currency> add support for a currency
      remove_currency <currency> remove support for a currency
      set_domain <domain>    set the domain name of the gateway
      get_domain             get the domain name of the gateway

      set_postgres_url <url> set the url of the postgres database
      get_postgres_url       get the url of the postgres database
      set_ripple_rest_url <url> set the url of the ripple rest api
      get_ripple_rest_url    get the url of the ripple rest api
      set_key                set the admin api key
      get_key                get the admin api key
      set_last_payment_hash <hash> set the last encountered payment hash for incoming processing.
      get_last_payment_hash  get the last encountered payment hash for incoming processing.
    
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
    
A newly recorded deposit is handed to the business logic, which performs some function, ultimately en-queuing a corresponding ripple payment. This process is designed to be modified and customized.

    node processes/deposits.js

API calls: list_deposits, enqueue_payment

-  Process 3: Send Outgoing Ripple Payments

A payment record resulting from the deposit business logic process is sent to the Ripple REST server, ultimately propagating to the network. This process is standard and should not be modified.

    node processes/outgoing.js

API calls: send_payment

## Process Flow of a Gateway Withdrawal

- Process 1: Record inbound Ripple payments

Poll the Ripple REST server for new payment notifications to the gateway, and record the incoming payments in the ripple gateway data store. This process is standard and should not be modified.

    node processes/incoming.js

API calls: get_payment_notification, record_payment

- Process 2: Withdrawal Business Logic

A newly recorded incoming ripple payment is handed to the business logic, which performs some function, ultimately en-queuing a corresponding asset withdrawal record. This process is designed to be modified and customized.

    node processes/withdrawals.js

API calls: enqueue_withdrawal

- Process 3: Clear Withdrawals

A banking API integration or manual human gateway operator reads the queue of pending withdrawals from the gateway data store, redeems the corresponding asset, and finally clears the withdrawal from the queue by updating the gateway data store. This process is designed to be implemented externally, and example implementations are provided by the command line interface and the http/json express.js server.

API calls: list_withdrawals, clear_withdrawal

Alternatively one can provide a WITHDRAWALS_CALLBACK_URL in the configuration, and then start the withdrawal_callbacks process to receive POST notifications whenever a new withdrawal comes in the gateway from the Ripple network. This process is currently not starte by default.

