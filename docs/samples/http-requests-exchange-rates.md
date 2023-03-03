# Using HTTPS Outcalls to Fetch Exchange Rates

## Exchange Rate sample dapp overview

The [HTTPS outcalls](/https-outcalls) feature provides a way for canisters to directly interact with web services that exist outside of the Internet Computer in the Web 2.0 world. The Exchange Rate sample dapp is created to demonstrate simple usage of the HTTPS outcalls feature. Here are implementations in [Rust](https://github.com/dfinity/examples/tree/master/rust/exchange_rate) and [Motoko](https://github.com/dfinity/examples/tree/master/motoko/exchange_rate).

The sample dapp pulls ICP/USDC exchange rates from a single provider – [Coinbase](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductcandles). The purpose of the sample dapp is to provide an example of using  the [HTTPS outcalls API](/docs/current/references/ic-interface-spec#ic-http_request). 

## What does the sample dapp do

**TL;DR the sample dapp is just an unbounded time series cache.**

There are two parts to the sample dapp:
1. the frontend UI canister `exchange_rate_assets`, which includes a time range picker and a rate chart and
2. the backend provider canister `exchange_rate`, which performs HTTPS outcalls, queues jobs, transforms responses, etc.

Request from users, are queued in the backend canister. Asynchronously at every few Internet Computer heartbeats, the backend canister
makes a Coinbase API request. To bound the size of the each response, each request pulls at most 200 data points from Coinbase, 
which is less than the limit of 300 which Coinbase has. The dapp uses timeseries granularity of 60 seconds, so each HTTPS request to
Coinbase covers up to 200 minutes of data. The fetched data points are then put into a global timestamp-to-rate hashmap.

If the time range the user is interested in is longer than a couple of years, the data points to be returned
by the backend `exchange_rate` canister could be too large for the current response limit (2MB).
As a result, we cap the number of data points to be returned by the backend `exchange_rate` canister to
the frontend `exchange_rate_assets` canister, and increase the sampling interval to cover the full requested range.

## Exchange Rate sample dapp architecture
![Architecture overview diagram of the Exchange Rate dapp](_attachments/exchange_rate_arch.png)

## How to use the sample dapp

Users should be able to interact only with the frontend UI canister by selecting the start time 
and the end time with the datetime pickers.

The returned rates may not exactly match the user's time selection. (There could be gaps between
data points or there could be a smaller range being returned). The reason is that to respect rate limiting
on the remote service, we fetch data from the remote service once every few IC heartbeats.
Consequently, pulling all requested rates can be a relatively long asynchronous operation. 

All the previously-pulled rates are stored in memory. As the user submits their requests, the rates that are
already available are returned, while the ones that are not yet available will be fetched eventually.
If the user spots gaps between requested rates and returned rates, the user needs to wait for some time and
retry the request, and likely the full set of rates will be available then.

## Cost analysis of the `exchange_rate` canister

There are 2 major factors affecting the [pricing](/docs/current/developer-docs/integrations/http_requests/http_requests-how-it-works#pricing) when it comes to the HTTPS outcalls feature:

* The number of requests 
* The size of each request and response

If we need to fetch a longer period of rates then the number of external HTTPS outcalls is inversely proportional to the body size of each request.
This sample dapp minimizes the total number of HTTPS outcalls at the cost of bigger response bodies. 

## Building and deploying the sample dapp locally
Here are implementations in [Rust](https://github.com/dfinity/examples/tree/master/rust/exchange_rate) and [Motoko](https://github.com/dfinity/examples/tree/master/motoko/exchange_rate). Please refer to the `README.md` file in each
directory for instrutions on building and local deployment.

