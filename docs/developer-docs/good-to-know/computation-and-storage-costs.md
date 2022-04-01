# Computation and Storage Costs

The Internet Computer requires computation operations and storage to be supported by cycles. Cycles are generated from the conversion of Internet Computer (ICP) utility tokens.

## The Role of the Network Nervous System (NNS) in Defining Costs

The Internet Computer is a decentralized public utility, controlled by the NNS –– the network’s open, algorithmic governance system. The NNS fundamentally controls how many cycles are required for low-level computation actions for computation and storage. The number of cycles needed for individual computations will vary based on a number of factors considered by the NNS, including proposals from the community.

## Details: Cost of Compute and Storage Transactions on the Internet Computer

Canister smart contract computations running on the Internet Computer blockchain are fueled by “cycles”, which play a similar role to “gas” on Ethereum. There are several major differences however. One of the most fundamental differences is that Ethereum leverages “user pays” and the Internet Computer and “smart contract pays” (sometimes called “reverse gas”) model. Whereas the Ethereum blockchain requires end users to send payments for the gas smart contracts consume with every transaction, on the Internet Computer, Canister smart contracts are pre-charged with cycles, such that contracts effectively pay for their own computation - freeing users from the responsibility.

See below for details on the cost of compute and storage transactions on the Internet Computer as of July 26, 2021.

<!-- <table>
<caption>Cycles Cost per Transaction (as of July 26, 2021)</caption>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />npm s
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Transaction</th>
<th style="text-align: left;">Description</th>
<th style="text-align: right;">All Application Subnets</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Canister Created</p></td>
<td style="text-align: left;"><p>For creating canisters on a subnet</p></td>
<td style="text-align: right;"><p>100,000,000,000</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Compute Percent Allocated Per Second</p></td>
<td style="text-align: left;"><p>For each percent of the reserved compute allocation (a scarce resource).</p></td>
<td style="text-align: right;"><p>100,000</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Update Message Execution</p></td>
<td style="text-align: left;"><p>For every update message executed</p></td>
<td style="text-align: right;"><p>590,000</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Ten Update Instructions Execution</p></td>
<td style="text-align: left;"><p>For every 10 instructions executed when executing update type messages</p></td>
<td style="text-align: right;"><p>4</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Xnet Call</p></td>
<td style="text-align: left;"><p>For every inter-canister call performed (includes the cost for sending the request and receiving the response)</p></td>
<td style="text-align: right;"><p>260,000</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Xnet Byte Transmission</p></td>
<td style="text-align: left;"><p>For every byte sent in an inter-canister call (for bytes sent in the request and response)</p></td>
<td style="text-align: right;"><p>1,000</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Ingress Message Reception</p></td>
<td style="text-align: left;"><p>For every ingress message received</p></td>
<td style="text-align: right;"><p>1,200,000</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Ingress Byte Reception</p></td>
<td style="text-align: left;"><p>For every byte received in an ingress message</p></td>
<td style="text-align: right;"><p>2,000</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>GB Storage Per Second</p></td>
<td style="text-align: left;"><p>For storing a GB of data per second</p></td>
<td style="text-align: right;"><p>127,000</p></td>
</tr>
</tbody>
</table> -->

Cycles Cost per Transaction (as of July 26, 2021)

The $USD cost for transactions below is based on the above cycle costs. 1 XDR is equal to 1 Trillion cycles. As of July 26, 2021, the exchange rate for 1 XDR = $1.42. The exchange rate for USD &lt;&gt; XDR may vary and it will impact the conversion rate. For XDR exchange rates please visit: <https://www.imf.org/external/np/fin/data/rms_sdrv.aspx>

To derive the estimated GB Storage per month, we assume a 30 day month.

<!-- <table>
<caption>Cost per Transaction in $USD (as of July 26, 2021)</caption>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Transaction</th>
<th style="text-align: left;">Description</th>
<th style="text-align: right;">All Application Subnets</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Canister Created</p></td>
<td style="text-align: left;"><p>For creating canisters on a subnet</p></td>
<td style="text-align: right;"><p>$0.142</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Compute Percent Allocated Per Second</p></td>
<td style="text-align: left;"><p>For each percent of the reserved compute allocation (a scarce resource).</p></td>
<td style="text-align: right;"><p>$0.000000142</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Update Message Execution</p></td>
<td style="text-align: left;"><p>For every update message executed</p></td>
<td style="text-align: right;"><p>$0.0000008378</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Ten Update Instructions Execution</p></td>
<td style="text-align: left;"><p>For every 10 instructions executed when executing update type messages</p></td>
<td style="text-align: right;"><p>$0.00000000000568</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Xnet Call</p></td>
<td style="text-align: left;"><p>For every inter-canister call performed (includes the cost for sending the request and receiving the response)</p></td>
<td style="text-align: right;"><p>$0.0000003692</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Xnet Byte Transmission</p></td>
<td style="text-align: left;"><p>For every byte sent in an inter-canister call (for bytes sent in the request and response)</p></td>
<td style="text-align: right;"><p>$0.00000000142</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Ingress Message Reception</p></td>
<td style="text-align: left;"><p>For every ingress message received</p></td>
<td style="text-align: right;"><p>$0.000001704</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Ingress Byte Reception</p></td>
<td style="text-align: left;"><p>For every byte received in an ingress message</p></td>
<td style="text-align: right;"><p>$0.00000000284</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>GB Storage Per Second</p></td>
<td style="text-align: left;"><p>For storing a GB of data per second</p></td>
<td style="text-align: right;"><p>$0.00000018034</p></td>
</tr>
</tbody>
</table> -->

Cost per Transaction in $USD (as of July 26, 2021)

Assuming a 30 day month — 

<!-- <table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>GB Storage Per Month</p></td>
<td style="text-align: left;"><p>For storing a GB of data per month</p></td>
<td style="text-align: right;"><p>$0.467</p></td>
</tr>
</tbody>
</table> -->
