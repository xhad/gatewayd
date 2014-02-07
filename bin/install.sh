sudo apt-get -y install python-software-properties
sudo apt-get -y install python
sudo apt-get -y install g++
sudo apt-get -y install make
sudo apt-get -y install libpg-dev
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get -y update
sudo apt-get -y install nodejs
sudo apt-get -y postgresql
sudo apt-get -y install postgresql-client
sudo apt-get -y install git
sudo -u postgres psql postgres
\password postgres
\q
sudo -u postgres createdb ripple_gateway
git clone https://github.com/stevenzeiler/ripple-gateway-api.git
cd ripple-gateway-api
sudo npm install
sudo npm install -g pg
sudo npm install -g db-migrate
db-migrate up --config config/database.json --migrations-dir db/migrations
bin/gateway init
bin/gateway start
