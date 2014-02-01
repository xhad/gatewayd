## Gateway REST API Server

This software is a database-backed web server that serves as a
back end for Ripple Gateway applications.

The Ripple Gateway appliance is a virtual machine image that
is meant to serve as a standalone package for configuring
and running a Ripple gateway system.


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

    gateway set rest [gateway api url]
    gateway get rest

    gateway set postgres [postgresl url]
    gateway get postgres

    gateway set ripple [ripple simple url]
    gateway get ripple

    gateway set hotwallet [account] [secret]  
    gateway get hotwallet

    gateway set coldwallet [account] [secret]
    gateway get coldwallet

    gateway set username [username]
    gateway get username

    gateway set password [password]
    gateway get password

    gateway add currency [code] [issuer]
    gateway remove currency [code] [issuer]
    gateway get currencies

    gateway get withdrawals
    gateway clear withdrawal [transaction id]

    gateway deposit [account id] [amount] [code] [issuer]

    gateway init
    gateway start [--env]
    gateway stop

    gateway logs

