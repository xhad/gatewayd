module.exports = {
  requests: {
    valid: {
      amount: '0.01',
      currency: 'ZMK',
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    },
    invalid_amount: {
      amount: '0.01a',
      currency: 'ZMK',
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    },
    invalid_currency: {
      amount: '0.01a',
      currency: 'ZMK',
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    },
    invalid_address: {
      amount: '0.01',
      currency: '$ZMK',
      address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    },
    invalid_destination_tag: {
      amount: '0.01',
      currency: 'ZMK',
      address: 'r123',
      destinationTag: 'a123'
    },
    invalid_issuer_address: {
      amount: '0.01',
      currency: 'ZMK',
      address: 'r123',
      issuer: 'r123'
    }
  }
};
