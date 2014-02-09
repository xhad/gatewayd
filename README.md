## Gateway API Server

This software is a database-backed web server that serves as a
back end for Ripple Gateway applications.

The Ripple Gateway appliance is a virtual machine image that
is meant to serve as a standalone package for configuring
and running a Ripple gateway system.

## Api Docs

The primary interface to the Ripple Gateway server is via HTTP with JSON.

[API Documenation](./doc/rest.md) is available in the git repo.

## Dependencies

1. Node.js

2. Postgres

3. Ripple REST API

## Installation

The gateway server software requires git, g++, make, nodejs, postgres, and several npm modules.

- Detailed [installation instructions](./doc/install.md) for Ubuntu 13.10

## HTTP Client Library

A node.js http client library is provided that maps functions one-to-one to HTTP API commands
- [Client Library Docs](./doc/http_client.md)

## Command Line Interface

A CLI tool is provided for interacting with the API and configuring the gateway as an admin
- [CLI Docs](./doc/cli.md)
