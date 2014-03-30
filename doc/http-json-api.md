## HTTP / JSON API examples

### Record Deposit

    curl -k --data "external_account_id=1&amount=1&currency=USD" http:/localhost:5000/api/v1/deposits
    {
      "deposit": {
        "external_account_id": 1,
        "currency": "USD",
        "amount": "1",
        "deposit": true,
        "status": "queued",
        "updatedAt": "2014-03-31T05:28:21.663Z",
        "createdAt": "2014-03-31T05:28:21.663Z",
        "id": 157,
        "ripple_transaction_id": null
      }

### List Deposit Processing Queue

    curl -k http:/localhost:5000/api/v1/deposits
    {
      "deposits": [
        {
          "id": 160,
          "amount": "1",
          "currency": "USD",
          "deposit": true,
          "external_account_id": 1,
          "status": "queued",
          "ripple_transaction_id": null,
          "createdAt": "2014-03-31T05:38:27.237Z",
          "updatedAt": "2014-03-31T05:38:27.237Z"
        },
        {
          "id": 161,
          "amount": "117.2",
          "currency": "USD",
          "deposit": true,
          "external_account_id": 1,
          "status": "queued",
          "ripple_transaction_id": null,
          "createdAt": "2014-03-31T05:38:49.822Z",
          "updatedAt": "2014-03-31T05:38:49.822Z"
        }
      ]
    }

### List Outgoing Payments Queue

    curl -k http:/localhost:5000/api/v1/payments/outgoing
    {
      "payments": [
        {
          "id": 190,
          "to_address_id": 1,
          "from_address_id": 2,
          "transaction_state": "outgoing",
          "transaction_hash": null,
          "to_amount": "1",
          "to_currency": "USD",
          "to_issuer": "rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP",
          "from_amount": "1",
          "from_currency": "USD",
          "from_issuer": "rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP",
          "createdAt": "2014-03-31T05:37:07.964Z",
          "updatedAt": "2014-03-31T05:37:07.964Z"
        },
        {
          "id": 189,
          "to_address_id": 1,
          "from_address_id": 2,
          "transaction_state": "outgoing",
          "transaction_hash": null,
          "to_amount": "1",
          "to_currency": "USD",
          "to_issuer": "rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP",
          "from_amount": "1",
          "from_currency": "USD",
          "from_issuer": "rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP",
          "createdAt": "2014-03-31T05:36:32.094Z",
          "updatedAt": "2014-03-31T05:36:32.094Z"
        }
      ]
    }

## List Incoming Payment Processing Queue

    curl -k http://localhost:5000/api/v1/payments/incoming
    {
      "payments": [
        {
          "id": 195,
          "to_address_id": 0,
          "from_address_id": 2,
          "transaction_state": "incoming",
          "transaction_hash": "F7A679B94549C468F8E2251780F3A3968972F1FF952BAA6EAD59C8DE87212A73",
          "to_amount": "1.234567",
          "to_currency": "USD",
          "to_issuer": "coldWallet",
          "from_amount": "1.234567",
          "from_currency": "USD",
          "from_issuer": "coldWallet",
          "createdAt": "2014-03-31T06:08:47.922Z",
          "updatedAt": "2014-03-31T06:08:47.922Z"
        }
      ]
    }

## List Pending Withdrawals

    curl -k http://localhost:5000/api/v1/withdrawals
    {
      "withdrawals": [
        {
          "id": 162,
          "amount": "14.85",
          "currency": "USD",
          "deposit": false,
          "external_account_id": 1,
          "status": "pending",
          "ripple_transaction_id": 193,
          "createdAt": "2014-03-31T05:52:38.578Z",
          "updatedAt": "2014-03-31T05:52:38.578Z"
        }
      ]
    }

## Clear Pending Withdrawal

    curl -k -X POST http://localhost:5000/api/v1/withdrawals/162/clear
    {
      "withdrawal": {
        "id": 162,
        "amount": "14.85",
        "currency": "USD",
        "deposit": false,
        "external_account_id": 1,
        "status": "cleared",
        "ripple_transaction_id": 193,
        "createdAt": "2014-03-31T12:52:38.578Z",
        "updatedAt": "2014-03-31T05:55:49.425Z"
      }
    }

