module.exports = {
  errors: {
    insufficient_funds: {
      success: false,
      error_type: 'transaction',
      error: 'terINSUF_FEE_B'
    },
    connection: {
      no_rippled_connection: {
        success: false,
        error_type: 'connection',
        error: 'Cannot connect to rippled'
      },
      rippled_busy: {
        success: false,
        error_type: 'transaction',
        error: 'Rippled Busy',
        message: 'The server is experiencing heavy load and is unable to process the request right now. Please try again.'
      }
    },

    invalid_requests: {
      no_paths_found: {
        success: false,
        error_type: 'invalid_request',
        error: 'No paths found',
        message: 'Please ensure that the source_account has sufficient funds to execute the payment. If it does there may be insufficient liquidity in the network to execute this payment right now'
      },
      transaction_not_found: {
        success: false,
        error_type: 'invalid_request',
        error: 'Transaction not found',
        message: 'A transaction hash was not supplied and there were no entries matching the client_resource_id.'
      }
    }
  },
  outgoing_record: {
    to_amount: 0.0019399999999999999,
    from_amount: 0.002,
    to_address_id: 820,
    from_address_id: 623,
    to_currency: 'XRP',
    to_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    from_currency: 'XRP',
    from_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    state: 'outgoing',
    external_transaction_id: 169
  },
  successful_responses: {
    validated_payment: {
      source_account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr',
      source_tag: '623',
      source_amount: { value: '0.001939', currency: 'XRP', issuer: '' },
      source_slippage: '0',
      destination_account: 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6',
      destination_tag: '',
      destination_amount: { value: '0.001939', currency: 'XRP', issuer: '' },
      invoice_id: '',
      paths: '[]',
      no_direct_ripple: false,
      partial_payment: false,
      direction: 'outgoing',
      state: 'validated',
      result: 'tesSUCCESS',
      ledger: '',
      hash: '9DDCEBAB6D751C22755F9303B59E1E2FDC8308B551A4C5AE89343BD6F2255169',
      timestamp: '2014-06-30T00:28:46.000Z',
      fee: '0.000012',
      source_balance_changes: [],
      destination_balance_changes: []
    }
  },
  requests: {
    payment: {
      source_account: 'rDmSZbgLbw7qkkgDXMWoiSQX7VZ6KknWcL',
      source_tag: '',
      source_amount: { value: '0.001939', currency: 'XRP', issuer: '' },
      source_slippage: '0',
      destination_account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr',
      destination_tag: '0',
      destination_amount: { value: '0.001939', currency: 'XRP', issuer: '' },
      invoice_id: '',
      paths: '[]',
      partial_payment: false,
      no_direct_ripple: false
    },
    pending_payment: {
      success: true,
      client_resource_id: '1',
      status_url: 'https://api.ripple.com/v1/accounts/rDmSZbgLbw7qkkgDXMWoiSQX7VZ6KknWcL/payments/1'
    }
  }
};