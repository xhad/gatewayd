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
    sudo apt-get -y postgresql
    sudo apt-get -y install postgresql-client

### Configure [Postgres](https://help.ubuntu.com/community/PostgreSQL)

set the postgres password, create the database and set the environment

    sudo -u postgres psql postgres
    \password postgres
    \q

    sudo -u postgres createdb ripple_gateway

### Gateway API Server

clone the project from github and install the package dependencies

    git clone https://github.com/ripple/ripple-gateway
    cd ripple-gateway
    sudo npm install -g pg
    sudo npm install -g db-migrate
    sudo npm install


migrate the database to create gateway tables

    export DATABASE_URL=postgres://postgres:password@localhost:5432/ripple_gateway
    cd node_modules/ripple-gateway-data-sequelize-adapter
    db-migrate up
    cd ../..
    
start the gateway rest api server

    node processes/webapp.js


