Gatewayd is designed to work with Heroku:

    git clone https://github.com/ripple/gatewayd.git
    cd gatewayd
    heroku create my-great-gateway-app
    git push heroku master
    heroku addons:add heroku-postgresql
    heroku config:set KEY=mysup3rs3cr3t@ap!k3y
    heroku ps:scale web=1
    
    curl http://my-great-gateway-app.herokuapp.com/v1/payments/outgoing \
      -X POST \
      -u admin:mysup3rs3cr3t@ap!k3y \ 
      -d address=r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk \ 
      -d currency=OMG \
      -d amount=100

