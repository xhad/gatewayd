var ripple = require('ripple-lib');
var _ = require('underscore-node');

var defaultRemote = new ripple.Remote({
  trusted: false,
  local_signing: true,
  local_fee: true,
  fee_cushion: 1.5,
  servers: [{ host: 's1.ripple.com', port: 443, secure: true }]
});

function getLines(opts, fn) {
  var remote = opts.remote || defaultRemote;
  remote.connect(function() {
    var account = new ripple.Account(remote, opts.fromAccount);
    account.lines(function(err, result) {
      if (err) { 
        fn(err, null);
        return;
      }
      var lines = result.lines;
      if (opts.toAccount) { 
        var linesToAccount = _.filter(lines, function(line) {
          return line.account === opts.toAccount; 
        }); 
        fn(null, linesToAccount);
        remote.disconnect();
      } else {
        fn(null, lines);
        remote.disconnect();
      }
    });
  });
}

module.exports = getLines; 
