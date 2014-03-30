## Gateway API Server

This software is a database-backed web server that serves as a
back end for Ripple Gateway applications. Server, Javascript Client, and CLI are provided as interfaces to a deployed gateway.

The Ripple Gateway's features include: 
  - user registration 
  - hosted wallets 
  - deposits
  - widthdrawals
  - off-ledger accounting
  - payment monitoring
  - issuing currency
  - sending and receiving
  - gateway administration
  - federation protocol

![](https://31.media.tumblr.com/8c2fb9e5a7ff0234c23718541c0ce0e0/tumblr_inline_n38fjucJcV1r3a3c5.jpg)

The Ripple Gateway software is composed of a backed data store which serves as a queue for many types of processes that handle deposits and withdrawals of assets, and issuance and receipt of digital currency on ripple. In this post I will explain the various processes of a ripple gateway that together form an automated machine of gateway transaction processing. 

In the diagram above each process is represented by a circle, and should be designed to scale horizontally, that is enable N processes of each type all operating on the same queues.

## Process Flow of a Gateway Deposit

- Process 1: Recording Deposits

A banking API integration or manual human gateway operator receives the deposit of an asset and records the deposit in the ripple gateway data store. This process is designed to be implemented externally, and example implementations are provided by the command line interface and the http/json express.js server.

API calls: record_deposit

- Process 2: Deposit Business Logic

A newly recorded deposit is handed to the business logic, which performs some function, ultimately en-queuing a corresponding ripple payment. This process is designed to be modified and customized.

API calls: list_deposits, enqueue_payment

-  Process 3: Send Outgoing Ripple Payments

A payment record resulting from the deposit business logic process is sent to the Ripple REST server, ultimately propagating to the network. This process is standard and should not be modified.

API calls: send_payment

## Process Flow of a Gateway Withdrawal

- Process 1: Record inbound Ripple payments

Poll the Ripple REST server for new payment notifications to the gateway, and record the incoming payments in the ripple gateway data store. This process is standard and should not be modified.

API calls: get_payment_notification, record_payment

- Process 2: Withdrawal Business Logic

A newly recorded incoming ripple payment is handed to the business logic, which performs some function, ultimately en-queuing a corresponding asset withdrawal record. This process is designed to be modified and customized.

API calls: enqueue_withdrawal

- Process 3: Clear Withdrawals

A banking API integration or manual human gateway operator reads the queue of pending withdrawals from the gateway data store, redeems the corresponding asset, and finally clears the withdrawal from the queue by updating the gateway data store. This process is designed to be implemented externally, and example implementations are provided by the command line interface and the http/json express.js server.

API calls: list_withdrawals, clear_withdrawal

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

## Command Line Interface

A CLI tool is provided for interacting with the API and configuring the gateway as an admin
- [CLI Docs](./doc/cli.md)
