var RippleTransaction = require('../models/ripple_transaction.js'); 

module.exports = (function(){
  return {
    show: function(req, res) {

    },

    create: function(req, res) {
      req.body.issuance = false
      req.body.deposit = true
      
      req.checkBody('toCurrency', 'Invalid toCurrency')
        .notEmpty().isAlphanumeric()
      req.checkBody('toAmount', 'Invalid toAmount')
        .notEmpty().isDecimal()
      req.checkBody('toAddress', 'Invalid fromAddress')
        .notEmpty().isAlphanumeric()

      req.body.fromCurrency = req.body.toCurrency
      req.body.fromAmount = req.body.toAmount

      var errors = req.validationErrors();
      if (errors) {
        res.send({ success: false, error: errors })
      }

      RippleTransaction.create(req.body).complete(function(err, tx){
        if (err) { 
          res.send({ success: false, error: err })
        } else {
          res.send({ success: true, rippleDeposit: tx })
        }
      })

    }
  } 
})()
