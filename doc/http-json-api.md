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
