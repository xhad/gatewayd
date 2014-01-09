module.exports = (function(){
  return {
    handleError: function(err, res) {
      res.send({ success: false, error:  err })
      return false 
    }
  }
})()
