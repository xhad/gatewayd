module.exports.incoming_payments = {
  valid: { source_account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr',
    source_tag: '',
    source_amount:
    { currency: 'SWD',
      issuer: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr',
      value: '0.00101' },
    source_slippage: '0',
    destination_account: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
    destination_tag: '',
    destination_amount:
    { currency: 'SWD',
      issuer: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
      value: '0.001' },
    invoice_id: '',
    paths: '[[{"account":"rPtzajzE295BsGecxqNdUxtfrEiH2VGUVA","type":1,"type_hex":"0000000000000001"}]]',
    no_direct_ripple: false,
    partial_payment: false,
    direction: 'incoming',
    state: 'validated',
    result: 'tesSUCCESS',
    ledger: '10326017',
    hash: 'B664743F640F0F2E79BC9C9887C6A569844EB91B5D9B4F17E5E9570AB78F8F53',
    timestamp: '2014-12-05T01:05:40.000Z',
    fee: '0.012',
    source_balance_changes:
      [ { value: '-0.012', currency: 'XRP', issuer: '' },
        { value: '-0.001',
          currency: 'SWD',
          issuer: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz' } ],
    destination_balance_changes:
      [ { value: '0.001',
        currency: 'SWD',
        issuer: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz' } ],
    memos: [ { MemoData: '7274312E312E33', MemoType: '636C69656E74' } ]
  },
  to_record: {
    state: 'incoming',
    source_amount: { value: '-0.012', currency: 'XRP', issuer: '' },
    destination_amount:
    { value: '0.001',
      currency: 'SWD',
      issuer: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz' },
    destination_tag: undefined,
    transaction_state: 'tesSUCCESS',
    hash: 'B664743F640F0F2E79BC9C9887C6A569844EB91B5D9B4F17E5E9570AB78F8F53',
    source_account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr',
    invoice_id: '',
    memos: [ { MemoData: '7274312E312E33', MemoType: '636C69656E74' } ]
  }
};
