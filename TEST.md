## Testing the Protocol Interface

In `ripple_listener` there is a worker script that listens to ripple the network, then there is another
that receives raw transaction data and formats it properly for transmission to the gateway for depositing.

We need to be able to distill various classes of payment transactions into a single, simplified object api to pass to the gateway for processing. In `/ripple_listener/test/fixures.js/` there are three raw, serialized ripple transactions, one testing XRP to XRP, one from EUR to XRP, and one from XAG to XAG. The `Payment` object interface takes as the argument to its constructor a raw, serialized ripple transaction and outputs the simplified incoming payment object.

To run the tests:

    node ripple_listener/test/incoming_payment_tes.js

For each test payment transaction we make assertions that it can output the Simpified API Object:

    var payment = new Payment(fixtures['IouToXrp'])
    console.log(payment.toJSON());
	
    { validated: true,
      txState: 'tesSUCCESS',
			txHash: '238235BE2DDA2F3E044000B7C96CE2ED6703CC0410878E21500E1F87C925C562',
			toCurrency: 'XRP',
			fromCurrency: 'EUR',
			toAmount: 100,
			fromAmount: '0.2226444',
			toAddress: 'rpL9vgUH7NBphD5H3FFqLQDhbtzEELS88n',
			fromAddress: 'rHKueQebtVU9cEamhBbMV8AEViqKjXcBcB',
			destinationTag: undefined }

Future tests must verify that the destinationTag property can be set, that transactions from XRP to IOUs can be properly simplified into a Payment object, and that the Payment object can distinguish whether it was an inbound or outbound payment from a particular gateway address.
