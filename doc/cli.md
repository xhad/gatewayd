# Ripple Gateway Command Line Interface

The executable file is located at bin/gateway, and is 
included in the package.json as an executable to be run
with `gateway`

    gateway ripple:rest:set [gateway api url]
    gateway ripple:rest:get

    gateway postgres:set [postgresl url]
    gateway postgres:get

    gateway ripple:set [ripple simple url]
    gateway ripple:get

    gateway hotwallet:set [account] [secret]  
    gateway hotwallet:get

    gateway coldwallet:set [account] [secret]
    gateway coldwallet:get

    gateway username:set [username]
    gateway username:get

    gateway password:set [password]
    gateway password:get

    gateway currencies:add [currency] --issuer
    gateway currencies:remove [currency] --issuer
    gateway currencies:get

    gateway withdrawals:get
    gateway withdrawals:clear [transaction id]

    gateway deposit [external_account_id] [amount] [currency] --issuer

    gateway start --env
    gateway stop

    gateway logs

