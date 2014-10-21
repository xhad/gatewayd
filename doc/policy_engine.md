## Gatewayd Incoming Payment Policy Engine

*** Draft ***

Fundamentally gatewayd is a transaction processing system
that connects payments on Ripple to payments on other financial
systems. Payments between the two networks are arranged and approved
based on a set of business rules according to the gatewayd operator.

The `IncomingPaymentPolicyEngine` monitors gatewayd's database for
incoming payments assessesing each payment and determining which
rules to apply to it, usually triggering a secondary outgoing payment.

To determine which policy applies to an incoming payment gatewayd
iterates in order through its list of registered policies

    gatewayd.policies.each(function(policy) {
      
      return policy.doesApply(payment);
    });

Order of policies is determined by the policy registration process.
The default registration adds a policy to the highest priority, top
of the order.

    gatewayd.policies.register(policy);

Optionally insert a policy before or after another policy:

    gatewayd.policies.register(policy, { before: 'invoice_policy' });
    gatewayd.policies.register(policy, { after: 'user_policy' });

To get a policy
  
    gatewayd.policies.get('invoice_policy'); 

    gatewayd.policies.all()

### The IncomingPaymentPolicy class

Every policy registered must be an instance of a class that inherits
from the `Policy` base class.

Every IncomingPaymentPolicy must have a name and type, and it must have functions
to determine whether the policy applies, and the actual application
function.

    new IncomingPaymentPolicy({
      name: 'invoice_policy',
      type: 'payment:external:incoming',
      doesApply: function(payment) {
        // determine whether the policy applies to the input payment
        return new Promise(function(resolve, reject) { });
      },
      apply: function(payment) {
        // actually apply the payment, most often triggering a
        // secondary payment on another financial system
        return new Promise(function(resolve, reject) { });
      }
    })

### The Invoice Policy

If the incoming payment has an associated gateway transaction record,
apply the invoice policy by triggering the associated outgoing payment.

### The Hosted Deposit Policy

If the incoming payment's associated account is type "hosted", apply
the hosted deposit policy by adding it value to the hosted wallet 
balance.

### The Bridge Policy

If the incoming payment's associated account has an associated bridge
record, apply the bridge policy by sending a corresponding payment to
the associated independent ripple address

### The Default Policy

If no policies apply but the state of the payment is still "incoming",
apply the default policy by marking the payment as failed.

