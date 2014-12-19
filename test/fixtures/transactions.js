module.exports = {
  valid_xrp_payment: {
    source_account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr',
    source_amount: {
      value: '0.002',
      currency: 'XRP',
      issuer: ''
    },
    destination_account: 'rDmSZbgLbw7qkkgDXMWoiSQX7VZ6KknWcL',
    destination_amount: {
      value: '0.0019399999999999999',
      currency: 'XRP',
      issuer: ''
    },
    partial_payment: false,
    no_direct_ripple: false,
    destination_tag: '0'
  },

  externalTransaction: {
    external_account_id: 1,
    source_amount: 4.32,
    source_currency: 'JPY',
    source_account_id: 432,
    destination_amount: 5.22,
    destination_currency: 'GBP',
    destination_account_id: 234,
    amount: 5,
    currency: 'USD',
    invoice_id: 'bc7e8a24e2911a5827c9b33d618531ef094937f2b3803a591c625d0ede1fffc6',
    memos: 'this is a memo 123',
    deposit: true
  },

  minimalExternalTransaction: {
    external_account_id: 2,
    deposit: true
  },

  rippleTransaction: {
    to_address_id: 1,
    from_address_id: 2,
    to_amount: 5,
    to_currency: 'USD',
    to_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    from_amount: 6,
    from_currency: 'USD',
    from_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    invoice_id: '',
    direction: 'from-ripple'
  }
};
