# Ripple Gateway Installation Instructions

The following instructions are for a clean build of OSX 10.9.4. If you have any problems please create an issue.

All of these commands assume your are in the base of the cloned project directory (e.g. ~/gatewayd).

## Install

### [Xcode](https://developer.apple.com/xcode/downloads/)

### Install gatewayd's dependencies using NPM:

    sudo npm install -g git
    sudo npm install -g pm2 --unsafe-perm
    sudo npm install --global pg grunt grunt-cli forever db-migrate jshint
    npm install --save

### Configure [Postgres](https://help.ubuntu.com/community/PostgreSQL)

Create the postgres user for gatewayd:

    sudo psql -U postgres -c "create user gatewayd_user with password 'password'"

If the "postgres" role doesn't exist, you can create one:

    psql
    CREATE USER postgres;

Create the database and grant the created user as owner:

    sudo psql -U postgres -c "create database gatewayd_db with owner gatewayd_user encoding='utf8'"
    
Create the corresponding test database:

    sudo psql -U postgres -c "create database gatewayd_db_test with owner gatewayd_user encoding='utf8'"    

### Make any environment specific database changes to lib/data/database.json (It should work by default if you followed the above instructions)

    ...
    "test": {
        "dialect":"postgres",
        "database": "gatewayd_db_test",
        "user": "gatewayd_user",
        "password": "",
        "host": "localhost",
        "port": "5432",
        "logging": true
      },
      "development": {
        "dialect":"postgres",
        "database": "gatewayd_db",
        "user": "gatewayd_user",
        "password": "",
        "host": "localhost",
        "port": "5432",
        "logging": true
      },
      "staging": {
        "dialect":"postgres",
        "database": "",
        "user": "",
        "password": "",
        "host": "",
        "port": "",
        "logging": false
      },
    ...

### Use Grunt to configure the postgres database

    grunt migrate
    
### Use Grunt to configure the test postgres database

    export NODE_ENV=test
    grunt migrate    

## Running gatewayd

The executable is located at bin/gateway:

    bin/gateway start

## Configure gatewayd

Once gatewayd is installed, [configure your gateway](./setup.md) wallets and server

### [Postgres basics](http://jazstudios.blogspot.com/2010/06/postgresql-login-commands.html)

