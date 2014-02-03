## Gateway REST API Server

This software is a database-backed web server that serves as a
back end for Ripple Gateway applications.

The Ripple Gateway appliance is a virtual machine image that
is meant to serve as a standalone package for configuring
and running a Ripple gateway system.

## REST Api Docs

The primary interface to the Ripple Gateway server is through HTTP REST with JSON.

[REST Documenation](./doc/rest.md) is available in the git repo.

## Dependencies

1. Node.js

2. Postgres

3. Ripple REST API

## Installation Instructions

The gateway server software requires git, g++, nodejs, postgres, and many npm packages.

- Detailed [installation instructions](./doc/install.md) for Ubuntu 13.10

## Command Line Interface

    gateway ripple:rest:set [gateway api url]
    gateway ripple:rest:get

    gateway postgres:set [postgresl url]
    gateway postgres:get

    gateway ripple:set [ripple simple url]
    gateway ripple:get

    gateway hotwallet:set [account] [secret]  
    gateway hotwallet:get

    gateway coldwallet:set [account] [secret]
    gateway coldwallet:get

    gateway username:set [username]
    gateway username:get

    gateway password:set [password]
    gateway password:get

    gateway currencies:add [currency] --issuer
    gateway currencies:remove [currency] --issuer
    gateway currencies:get

    gateway withdrawals:get
    gateway withdrawals:clear [transaction id]

    gateway deposit [external_account_id] [amount] [currency] --issuer

    gateway start --env
    gateway stop

    gateway logs

