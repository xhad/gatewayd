## Gateway REST API Server

This software is a database-backed web server that serves as a
back end for Ripple Gateway applications.

The Ripple Gateway appliance is a virtual machine image that
is meant to serve as a standalone package for configuring
and running a Ripple gateway system.


## Installation Instructions

1. Download the app repo

    git clone git@github.com:stevenzeiler/ripple-gateway-api.git
    cd ripple-gateway-api
    npm install
    npm install -g db-migrate

2. Configure PostgreSQL. Rememeber to append `?native=true` if connecting over SSL:

    export DATABASE_URL=postgres://user:pass@host:port/database?native=true

3. Run the database migrations to build the schema: 

    sudo db-migrate up --migrations-dir=db/migrations/ --env development

4. start the server
	
		node server.js

Once the server is started visit https://0.0.0.0:4000/
