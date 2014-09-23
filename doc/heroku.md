##Gatewayd is designed to work with Heroku##

```
git clone https://github.com/ripple/gatewayd.git
cd gatewayd
heroku create my-great-gateway-app
git push heroku master (or git push heroku <current branch name>:master)
heroku addons:add heroku-postgresql
heroku config:set KEY=mysup3rs3cr3t@ap!k3y
heroku config:set HOST=0.0.0.0
heroku config:set SSL=false
heroku ps:scale web=1
```    
###Migrate db###

```    
heroku config:get DATABASE_URL
``` 
copy the returned database url string
```    
DATABASE_URL=<paste database url string>?native=true grunt migrate
```

###Restart Heroku Instance###
```
heroku restart
```
    
###Check Server###

    curl http://my-great-gateway-app.herokuapp.com/v1/payments/outgoing \
      -X POST \
      -u admin:mysup3rs3cr3t@ap!k3y \ 
      -d address=r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk \ 
      -d currency=OMG \
      -d amount=100

