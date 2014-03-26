var trust = require('../lib/trust.js');

trust({ 
  currency: "XAU", 
  amount: 1, 
  issuer: "rUC2yaGet1kGWdvf6d7MJ27PqBx44sT9yP", 
  account: "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
  secret: process.argv[2]; 
}, 
  console.log
);
