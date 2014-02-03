# Ripple Gateway Installation Instructions

The following are for a clean build of Ubuntu 13.10. If you have any problems please create an issue.

### [Node.js)(http://stackoverflow.com/questions/16302436/install-nodejs-on-ubuntu-12-10)

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

### [Postgres](https://help.ubuntu.com/community/PostgreSQL)

    sudo apt-get install postgresql-client
    sudo apt-get install postgresql

set the postgres password

    sudo -u postgres psql postgres
    \password postgres

create the database and set the environment

    sudo -u postgres createdb ripple_gateway
    export DATABASE_URL=postgres://postgres:password@localhost:5432/ripple_gateway

### Gateway API Server

    git clone https://github.com/stevenzeiler/ripple-gateway-api.git
    cd ripple-gateway-api

install the package dependencies

    sudo npm install
    sudo npm install -g db-migrate

migrate the database to create gateway tables

    db-migrate --config config/database.json --migrations-dir db/migrations
    
configure the initial gateway parameters 

    bin/gateway init

start the gateway rest api server

    node server.js

