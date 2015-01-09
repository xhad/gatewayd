var Buffer = require('buffer');
var gatewayd = require(__dirname+'/../../../../');

// Function assume authorization header format is "Basic (base 64 encoded 'username'*|*'password')
// TODO: Abstract this out so we can use an authorize method in the future
function login(request, response) {
  var authorization = request.headers['authorization'];
  if (!authorization) {
    return response.sendStatus(400);
  }

  var parts = authorization.split(' ');
  if (parts.length < 2) {
    return response.sendStatus(400);
  }

  var scheme = parts[0];
  var credentials = new Buffer(parts[1], 'base64').toString().split('*|*');

  if (!/Basic/i.test(scheme) || credentials.length < 2) {
    return response.sendStatus(400);
  }

  var userid = credentials[0];
  var password = credentials[1];

  if (!userid || !password || userid !== 'admin@' + gatewayd.config.get('DOMAIN') || password !== gatewayd.config.get('KEY')) {
    return response.sendStatus(401);
  } else {
    return response.sendStatus(200);
  }
}

module.exports = login;

