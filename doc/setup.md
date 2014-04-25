# Gateway Setup Instructions #

First generate a cold wallet using the (Ripple Client)[https://ripple.com/client/#/register]. The secret key to your gateway's cold wallet should never be sent unencrypted to an untrusted entity, such as your web host.

1. Set(or generate) cold wallet address


    bin/gateway set_cold_wallet <address>
    
    
2. Set(or generate) hot wallet address and secret

   bin/gateway generate_wallet
   {
     address: 'address',
     secret: 'secret'
   }
   
   bin/gateway set_hot_wallet <address> <secret>

3. Add supported currencies


  bin/gateway add_currency XAG
  bin/gateway add_currency USD
  
  
4. Fund both cold and hot wallets

  Send 50 XRP to both the cold wallet address and hot wallet address to fund the accounts and register them with the ripple ledger.

5. Establish trust between hot to cold wallets

  bin/gateway set_trust 1000 XAG
  bin/gateway set_trust 1000 USD

6. Issue funds from cold to hot wallet

Using the Ripple Client at ripple.com/client send 1000 XAG to from the gateway's cold wallet to its hot wallet.
Using the Ripple Client at ripple.com/client send 1000 USD to from the gateway's cold wallet to its hot wallet.

7. Set last payment hash
8. Make sure `ripple-rest` is running
9. Start ripple-gateway processes

    bin/gateway start

10. Start registering users

    bin/gateway register_user

11. Accept deposits and credit accounts (issue funds into user ripple addresses)

    bin/gateway record_depsoit
