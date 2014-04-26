# Gateway Setup Instructions #

First generate a cold wallet using the (Ripple Client)[https://ripple.com/client/#/register]. The secret key to your gateway's cold wallet should never be sent unencrypted to an untrusted entity, such as your web host.

### Set(or generate) cold wallet address

    bin/gateway set_cold_wallet <address>

    
### Generate and set hot wallet address and secret

    bin/gateway generate_wallet
    bin/gateway set_hot_wallet <address> <secret>


### Add supported currencies

    bin/gateway add_currency XAG
    bin/gateway add_currency USD
  
  
### Fund both cold and hot wallets

  Send 50 XRP to both the cold wallet address and hot wallet address to fund the accounts and register them with the ripple ledger.

### Establish trust between hot to cold wallets

    bin/gateway set_trust XAG 1000
    bin/gateway set_trust USD 1000


### Issue funds from cold to hot wallet

Using the Ripple Client at ripple.com/client send 1000 XAG to from the gateway's cold wallet to its hot wallet.
Using the Ripple Client at ripple.com/client send 1000 USD to from the gateway's cold wallet to its hot wallet.

### Set last payment hash
### Make sure `ripple-rest` is running
### Start ripple-gateway processes

    bin/gateway start


### Start registering users

    bin/gateway register_user


### Accept deposits and credit accounts (issue funds into user ripple addresses)

    bin/gateway record_depsoit

