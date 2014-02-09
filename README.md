## Gateway API Server

This software is a database-backed web server that serves as a
back end for Ripple Gateway applications.

The Ripple Gateway appliance is a virtual machine image that
is meant to serve as a standalone package for configuring
and running a Ripple gateway system.

## Api Docs

[Application Programming Interface Docs](./doc/api.md) to the Ripple Gateway server with HTTP and JSON.

## Dependencies

1. Node.js

2. Postgres
  - The easiest way to get started with Postgres is by launching a [free database hosted by Heroku](https://postgres.heroku.com/databases)
  - For local development on Mac the simplest installation is via the [Postgres App](http://postgresapp.com/) by Heroku.

3. [Ripple REST API](https://github.com/ripple/ripple-rest.git)

The Ripple REST API provides a simplified HTTP/JSON interface to all the Ripple protocol network operations, such as payments and other transactions.

## Installation

The gateway server software requires git, g++, make, nodejs, postgres, and several npm modules.

- Detailed [installation instructions](./doc/install.md) for Ubuntu 13.10

## HTTP Client Library

A node.js http client library is provided that maps functions one-to-one to HTTP API commands
- [Client Library Docs](./doc/http_client.md)

## Command Line Interface

A CLI tool is provided for interacting with the API and configuring the gateway as an admin
- [CLI Docs](./doc/cli.md)
