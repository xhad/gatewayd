# Ripple Gateway Command Line Interface

The executable file is located at bin/gateway, and is 
included in the package.json as an executable to be run
with `gateway`


    Usage: gateway [options] [command]

    Commands:

      set_postgres_url <url> set the url of the postgres database
      get_postgres_url       get the url of the postgres database
      set_ripple_rest_url <url> set the url of the ripple rest api
      get_ripple_rest_url    get the url of the ripple rest api
      set_hot_wallet <address> <secret> set the gateway hot wallet
      get_hot_wallet         get the gateway hot wallet
      set_cold_wallet <account> set the gateway hot wallet
      get_cold_wallet        get the gateway cold wallet
      generate_wallet        generate a random ripple wallet
      set_key                set the admin api key
      get_key                get the admin api key
      generate_key           get the admin password
      list_withdrawals       get pending withdrawals to external accounts
      clear_withdrawals <external_transaction_id> clear pending withdrawal to external account
      fund_hot_wallet <amount> <currency> <secret> issue funds from cold wallet to hot wallet
      set_trust <currency> <amount> set level of trust from hot to cold wallet
      list_currencies        add support for a currency
      add_currencies <currency> add support for a currency
      remove_currencies <currency> remove support for a currency
      deposit <username> <amount> <currency> process a deposit by sending to ripple address
      list_users             list registered users
      register_user <username> <password> <ripple_address> create a user with a ripple address
      set_last_payment_hash <hash> set the last encountered payment hash for incoming processing.
      get_last_payment_hash  get the last encountered payment hash for incoming processing.
      restart                restart the gateway api server after update

    Options:

      -h, --help     output usage information
      -V, --version  output the version number
      -i, --issuer   specify an issuer other than the cold wallet
      -e, --env      specify the environment

