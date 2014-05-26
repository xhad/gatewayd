var gateway = require(__dirname+'/../../../../');

/*
* @requires Config
* @function setDomain
* @description Set the domain via http for use in the
* ripple.txt file and also as the email address for
* admin basic authentication. 
* @param {String} domain
*/

module.exports = function(req, res){

  gateway.config.set('DOMAIN', req.body.domain);
  gateway.config.save(function(){
    res.send({ 'DOMAIN': gateway.config.get('DOMAIN') });
  });

};
