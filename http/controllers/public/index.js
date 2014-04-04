var abstract = require('./../../../lib/abstract');
var nconf = require('./../../../config/nconf');
var fs = require('fs');

function registerUser(req, res) {
  abstract.registerUser(req.body, function(err, user){
    if (err) {
      res.send(500, { error: err });
    } else {
      res.send({ user: user });
    }
  })
}

function buildRippleTxt(req, res) {
  res.set({ 'Content-Type': 'text/plain' });
  var rippleTxt = "";

  if (nconf.get('gateway_cold_wallet')) {
    rippleTxt += "[accounts]\n"+nconf.get('gateway_cold_wallet')+"\n\n";
  }

  if (nconf.get('gateway_hot_wallet') && nconf.get('gateway_hot_wallet').address) {
    rippleTxt += "[hotwallets]\n"+nconf.get('gateway_hot_wallet').address;
  }

  var currencies = nconf.get('currencies');
  if (currencies) {
    rippleTxt += "\n\n[currencies]\n";
    for (currency in nconf.get('currencies')) {
      rippleTxt += (currency+"\n\n");
    };
  }

  var domain = nconf.get('domain');
  if (domain) {
    rippleTxt += ('[domain]\n'+domain+'\n\n');
  }

  res.send(rippleTxt);

}

function currencies(req, res) {
  var currencies = [];
  for (currency in nconf.get('currencies')) {
    currencies.push(currency);
  };
  res.send({ currencies: currencies });
}

function webapp(req, res) {
  fs.readFile(__dirname + '/../../../app/app.html', 'utf8', function(err, text){
    res.send(text);
  }); 
}

function loginUser(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var adminEmail = 'admin@' + nconf.get('domain');

  if  (name == adminEmail) {

    if (password == nconf.get('KEY')) {
      var user = {
        admin: true
      };
      res.send({ user: user });
    } else {
      res.send(401);
    }

  } else {

    api.users.read({ name: name }, function(err, user) {
      if (err) { res.send(500, { error: err }); return }
      var verified = api.users.verifyPassword(password, user.salt, user.password_hash);
      if (verified) {
        res.send({ user: user });
      } else {
        res.send(401);
      }
    });
  }
}



module.exports = {
  registerUser: registerUser,
  rippleTxt: buildRippleTxt,
  currencies: currencies,
  webapp: webapp,
  loginUser: loginUser
}
