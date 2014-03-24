var nconf = require('./config/nconf.js');
process.env.DATABASE_URL = nconf.get('DATABASE_URL');

var express = require('express');
var fs = require('fs');
var https = require('https');
var abstract = require("./lib/abstract.js");

var api = require(nconf.get('RIPPLE_DATAMODEL_ADAPTER'));
var passport = require('./config/passport')(api);

app = express();

app.use("/", express.static(__dirname + "/app"));
app.use(express.json());
app.use(express.urlencoded());

app.get('/app', function(req, res) {
  fs.readFile(__dirname + '/app/app.html', 'utf8', function(err, text){
      res.send(text);
  });
});

app.post('/api/v1/register', function(req, res) {
  abstract.registerUser(req.body, function(err, user){
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ user: user });
    }
  })
});

app.get('/api/v1/users/:name/ripple_address', function(req, res) {
  abstract.getUserRippleAddress(req.params.name, function(err, address) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ ripple_address: address });
    }
  });  
});

app.get('/api/v1/users/:name/external_account', function(req, res) {
  abstract.getUserExternalAccount(req.params.name, function(err, account) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ external_account: account });
    }
  });  

});

app.get('/api/v1/users/:name', function(req, res) {
  abstract.getUser(req.params.name, function(err, user) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ user: user });
    }
  });
});

app.get('/api/v1/users/:name/withdraw', function(req, res) {
  abstract.getUserExternalAccount(req.params.name, function(err, account) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ ripple_address: nconf.get("gateway_cold_wallet")+"?dt="+account.id });
    }
  });
});

app.get('/api/v1/users/:id/external_transactions', function(req, res) {
  abstract.readAllUserExternalTransactions(req.params.id, function(err, transactions) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ external_transactions: transactions });
    }
  });    
});

app.post('/api/v1/users', function(req, res){
  var opts = {
    name: req.body.name,
    password: req.body.password
  };
  api.users.create(opts, function(err, user){
    console.log(err, user);
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ user: user.toJSON() });
    }
  });
});

app.post('/api/v1/deposits', function(req, res) {
  abstract.deposit(req.body.name, req.body.amount, req.body.currency, function(err, deposit) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ deposit:  deposit });
    }
  });
});

app.get('/api/v1/ripple_transactions/queued', function(req, res) {
  api.rippleTransactions.readAll({ transaction_state: "queued" }, function(err, transactions) {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ ripple_transactions:  transactions || [] });
    }
  }); 
});

app.get('/ripple.txt', function(req, res) {
  res.set({ 'Content-Type': 'text/plain' });
  var rippleTxt = "[accounts]\n"+nconf.get('gateway_cold_wallet')+"\n\n"+
  "[hotwallets]\n"+nconf.get('gateway_hot_wallet').address+
  "\n\n[currencies]\n";

  var currencies = nconf.get('currencies');
  for (currency in nconf.get('currencies')) {
    rippleTxt += (currency+"\n");
  };
  res.send(rippleTxt);
});

app.get('/api/v1/currencies', function(req, res) {
  var currencies = [];
  for (currency in nconf.get('currencies')) {
    currencies.push(currency);
  };
  res.send({ currencies: currencies });
});

app.get('/api/v1/users', function(req, res) {
  abstract.getUserAccounts(function(err, users) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ users: users });
  });
});

app.get('/api/v1/withdrawals/pending', function(req, res) {
  api.externalTransactions.readAllPending(function(err, withdrawals){
    if (err) { res.send(500, { error: err }); return; }
    res.send({ withdrawals: withdrawals });
  });
});

app.post('/api/v1/withdrawals/:id/clear', function(req, res) {
  var opts = {
    id: req.params.id,
    status: "cleared"
  };
  api.externalTransactions.update(opts, function(err, withdrawal) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ withdrawal: withdrawal });
  });
});

app.get('/api/v1/ripple_addresses', function(req, res) {
  api.rippleAddresses.readAll({}, function(err, addresses) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ ripple_addresses: addresses });
  });
});

app.get('/api/v1/users/:id/external_accounts', function(req, res) {
  api.externalAccounts.readAll({ user_id: req.params.id }, function(err, accounts) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ ripple_accounts: accounts });
  });
})

app.get('/api/v1/users/:id/ripple_addresses', function(req, res) {
  api.rippleAddresses.readAll({ user_id: req.params.id }, function(err, accounts) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ ripple_accounts: accounts });
  });
})

app.get('/api/v1/external_accounts', function(req, res) {
  api.externalAccounts.readAll({}, function(err, accounts) {
    if (err) { res.send(500, { error: err }); return; }
    res.send({ ripple_accounts: accounts });
  });
});


var ssl = (nconf.get('SSL') && (nconf.get('SSL') != 'false'));

if (ssl) {
  app = https.createServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt')
  }, app);
}

var host = nconf.get('HOST');
var port = nconf.get('PORT');

app.listen(port, host);
