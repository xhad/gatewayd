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

Open postgres and take note of the role name with the 'Superuser' attribute:

    psql
    \dg
    \q

For consistency, let's call the Superuser role 'superuser' in the next couple of steps.

Create the postgres user for gatewayd:

    sudo psql -U superuser -c "create user gatewayd_user with password 'password'"

Create the database and grant the created user as owner:

    sudo psql -U superuser -c "create database gatewayd_db with owner gatewayd_user encoding='utf8'"

### Add the created postgres credentials to config/config.js.

    ...
    {
      'DATABASE_URL': 'postgres://gatewayd_user:password@localhost:5432/gatewayd_db'
    }
    ...

### Copy lib/data/database.example.json to lib/data/database.json and put your database configuration there. ( your DATABASE_URL )

    ...
    'development': {
      'ENV': 'postgres://gatewayd_user:password@localhost:5432/gatewayd_db'
    }
    ...

### Use Grunt to configure the postgres database

    grunt migrate

## Running gatewayd

The executable is located at bin/gateway:

    bin/gateway start

## Configure gatewayd

Once gatewayd is installed, [configure your gateway](./setup.md) wallets and server

### [Postgres basics](http://jazstudios.blogspot.com/2010/06/postgresql-login-commands.html)

