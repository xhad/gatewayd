## Gateway REST API Server

This software is a database-backed web server that serves as a
back end for Ripple Gateway applications.

The Ripple Gateway appliance is a virtual machine image that
is meant to serve as a standalone package for configuring
and running a Ripple gateway system.

## REST Api Docs

The primary interface to the Ripple Gateway server is through HTTP REST with JSON.

[./doc/rest.md](REST Documentation) is available in the git repo.

## Dependencies

1. Node.js

2. Postgres

3. Ripple REST API

## Installation Instructions

Download the app repo

    git clone git@github.com:stevenzeiler/ripple-gateway-api.git
    cd ripple-gateway-api
    npm install
    npm install -g db-migrate

Configure Postgres. Rememeber to append `?native=true` if connecting over SSL such as with Heroku:

    export DATABASE_URL=postgres://user:pass@host:port/database?native=true

Run the database migrations to build the schema: 

    db-migrate up --migrations-dir=db/migrations/ --env development

Configure the Ripple Simple REST Api

    export RIPPLE_SIMPLE_API=https://ripple-simple-api.herokuapp.com/api/v1/

Start the server

    node server.js

Once the server is started visit https://0.0.0.0:4000/

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

