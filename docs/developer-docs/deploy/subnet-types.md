# Subnet types

There are different subnet types available on the Internet Computer. These types are related to properties of the
subnets which make them suitable for different use cases.

## Available types

* `system` subnets: These subnets are reserved for canisters that are an integral part of the Internet Computer. Typically, canisters on these subnets are controlled by the NNS and they don't pay cycles. Users cannot deploy canisters on those subnets.
* `application` subnets: These are the default subnets that users can deploy canisters to. They typically have a size of 13 nodes and canisters on them have to pay cycles. If a user does not provide any specific requirements a random application subnet is chosen as the destination to create the canister.

On top of these basic types, there are also specialized types of subnets that offer certain additional properties that
might be useful to dapps. The first such specialized type is "Fiduciary" which is essentially a larger version of an
application subnet. Having more nodes provides better security guarantees to dapps running on a "Fiduciary" subnet at
the expense of being more expensive in terms of cycles cost (costs scale linearly to number of nodes, for more details
see [here](computation-and-storage-costs.md)).
