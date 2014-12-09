function RippleRestErrorHandler () {
  this.normalized_error_messages = {
    no_paths_found: 'noPathsFound',
    insufficient_balance: 'insufficientFeeBalance'
  };

  this.retry = 'retry';

  this.ripple_rest_errors = {
    no_paths_found: 'No paths found',
    transaction_not_found: 'Transaction not found'
  };

  this.rippled_error_codes = {
    insufficient_balance: 'terINSUF_FEE_B',
    max_ledger: 'tefMAX_LEDGER',
    no_paths_found: 'tecPATH_DRY',
    rippled_busy: 'Rippled Busy'
  };

}

RippleRestErrorHandler.prototype = {
    connection: function() {
      return this.retry;
    },
    server: function() {
      return this.retry;
    },
    invalid_request: function(error) {
      switch (error.error) {
        case this.ripple_rest_errors.no_paths_found:
          return this.normalized_error_messages.no_paths_found;
        case this.ripple_rest_errors.transaction_not_found:
          return this.retry;
        default:
          return;
      }
    },
    transaction: function(error) {
      switch (error.error) {
        case this.rippled_error_codes.max_ledger:
        case this.rippled_error_codes.rippled_busy:
          return this.retry;
        case this.rippled_error_codes.insufficient_balance:
          return this.normalized_error_messages.insufficient_balance;
        default:
          return;
      }
    }
};

module.exports = new RippleRestErrorHandler();
