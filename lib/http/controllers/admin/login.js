var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res) {
  res.status(200).send({admin: true});
};
