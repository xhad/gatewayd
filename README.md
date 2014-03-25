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

## Api Docs

See the [Application Programming Interface Docs](./doc/api.md) to the Ripple Gateway for usage.

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
