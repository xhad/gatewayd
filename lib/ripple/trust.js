var ripple = require('ripple-lib');

var defaultRemote = new ripple.Remote({
  trusted: false,
  local_signing: true,
  local_fee: true,
  fee_cushion: 1.5,
  servers: [{ host: 's1.ripple.com', port: 443, secure: true }]
});

function trust(opts, fn) {
  var remote = opts.remote || defaultRemote;
  remote.connect(function() {
    var transaction = remote.transaction();
    var Amount = opts.amount + '/' + opts.currency + '/' + opts.issuer;
    transaction.rippleLineSet(opts.account, Amount);
    transaction.secret(opts.secret);
    transaction.on('success', function(tx){
      fn(null, tx);
      remote.disconnect(); 
    });

    transaction.on('error', function(err){
      fn(err, null);
      remote.disconnect(); 
    });

    transaction.submit();
  });
}

module.exports = trust;
