# Ripple Gateway Installation Instructions

The following are for a clean build of Ubuntu 13.10. If you have any problems please create an issue.

### [Node.js](http://stackoverflow.com/questions/16302436/install-nodejs-on-ubuntu-12-10) and packages.

    sudo apt-get -y install git
    sudo apt-get -y install python-software-properties
    sudo apt-get -y install python
    sudo apt-get -y install g++
    sudo apt-get -y install make
    sudo apt-get -y install libpq-dev
    sudo add-apt-repository -y ppa:chris-lea/node.js
    sudo apt-get -y update
    sudo apt-get -y install nodejs
    sudo apt-get -y install postgresql
    sudo apt-get -y install postgresql-client

### Configure [Postgres](https://help.ubuntu.com/community/PostgreSQL)

set the postgres password, create the database and set the environment

    sudo -u postgres psql postgres
    \password postgres
    \q

    sudo -u postgres createdb ripple_gateway

Export your database url to the environment to set up the ripple gateway data tables

    export DATABASE_URL=postgres://postgres:password@localhost:5432/ripple_gateway

If you are using an SSL connection to your database, remember to append the following to its url:

    export DATABASE_URL=postgres://postgres:password@localhost:5432/ripple_gateway?native=true

Install gatewayd's dependencies using NPM:

    npm install
    sudo npm install -g pg
    sudo npm install -g db-migrate
    sudo npm install -g grunt
    sudo npm install -g pm2

Use grunt to create database tables

    grunt migrate
    
start the gateway rest api server. The executable is located at ripple-gateway/bin/gateway:

    bin/gateway start

## Setup

Once ripple-gateway is installed, [configure your gateway](./setup.md) wallets and server

