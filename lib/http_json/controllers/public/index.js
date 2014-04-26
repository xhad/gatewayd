var gateway = require(__dirname+'/../../../../');
var fs = require('fs');

function registerUser(req, res) {
  gateway.users.register(req.body, function(err, user){
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

  if (gateway.config.get('COLD_WALLET')) {
    rippleTxt += "[accounts]\n"+gateway.config.get('COLD_WALLET')+"\n\n";
  }

  if (gateway.config.get('HOT_WALLET') && gateway.config.get('HOT_WALLET').address) {
    rippleTxt += "[hotwallets]\n"+gateway.config.get('HOT_WALLET').address;
  }

  var currencies = gateway.config.get('CURRENCIES');
  if (currencies) {
    rippleTxt += "\n\n[currencies]\n";
    for (currency in gateway.config.get('CURRENCIES')) {
      rippleTxt += (currency+"\n\n");
    };
  }

  var domain = gateway.config.get('DOMAIN');
  if (domain) {
    rippleTxt += ('[domain]\n'+domain+'\n\n');
  }

  res.send(rippleTxt);

}

function currencies(req, res) {
  var currencies = [];
  for (currency in gateway.config.get('CURRENCIES')) {
    currencies.push(currency);
  };
  res.send({ currencies: currencies });
}

function webapp(req, res) {
  fs.readFile(__dirname + '/../../../../node_modules/ripple-gateway-webapp-example/app.html', 'utf8', function(err, text){
    res.send(text);
  }); 
}

function loginUser(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var adminEmail = 'admin@' + gateway.config.get('domain');

  if  (name == adminEmail) {

    if (password == gateway.config.get('KEY')) {
      var user = {
        admin: true
      };
      res.send({ user: user });
    } else {
      res.send(401);
    }

  } else {

    gateway.data.users.read({ name: name }, function(err, user) {
      if (err) { res.send(500, { error: err }); return }
      var verified = gateway.data.users.verifyPassword(password, user.salt, user.password_hash);
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
