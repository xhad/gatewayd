var gateway = require('./../../../');

module.exports = function(api) {

  api.create(req, res) {
    gateway.data.rippleAddresses.readAll({}, function(err, addresses) {
      if (err) { res.send(500, { error: err }); return; }
      res.send({ ripple_addresses: addresses });
    });
  };

  api.index(req, res) {
    gateway.data.rippleAddresses.readAll({}, function(err, addresses) {
      if (err) { res.send(500, { error: err }); return; }
      res.send({ ripple_addresses: addresses });
    });
  };

  api.show(req, res) {
    gateway.data.rippleAddresses.readAll({}, function(err, addresses) {
      if (err) { res.send(500, { error: err }); return; }
      res.send({ ripple_addresses: addresses });
    });
  };

  api.update(req, res) {
    gateway.data.rippleAddresses.readAll({}, function(err, addresses) {
      if (err) { res.send(500, { error: err }); return; }
      res.send({ ripple_addresses: addresses });
    });
  };

  api.delete(req, res) {
    gateway.data.rippleAddresses.readAll({}, function(err, addresses) {
      if (err) { res.send(500, { error: err }); return; }
      res.send({ ripple_addresses: addresses });
    });
  });

};

