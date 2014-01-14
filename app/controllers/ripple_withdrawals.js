var RippleTransaction = require('../models/ripple_transaction.js'); 

module.exports = (function(){
  return {
    show: function(req, res) {

    },

    create: function(req, res) {
      req.body.issuance = true
      req.body.deposit = false
      
      req.checkBody('toCurrency', 'Invalid toCurrency')
        .notEmpty().isAlphanumeric()
      req.checkBody('toAmount', 'Invalid toAmount')
        .notEmpty().isDecimal()
      req.checkBody('toAddress', 'Invalid fromAddress')
        .notEmpty().isAlphanumeric()

      req.body.fromCurrency = req.body.toCurrency
      req.body.fromAmount = req.body.toAmount
      req.body.fromAddress = process.env.GATEWAY_ADDRESS || 'someGatewayAddress'
      req.body.txState = 'created'

      var errors = req.validationErrors();
      if (errors) {
        res.send({ success: false, error: errors })
      }

      RippleTransaction.create(req.body).complete(function(err, tx){
        if (err) { 
          res.send({ success: false, error: err })
        } else {
          res.send({ success: true, rippleWithdrawal: tx })
        }
      })

    }
  } 
})()
