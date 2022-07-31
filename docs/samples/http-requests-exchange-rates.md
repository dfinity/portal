# Making HTTP Request to Fetch Exchange Rates

## Exchange Rate sample dapp overview

The [Canister HTTP](https://internetcomputer.org/docs/current/developer-docs/build/using-an-agent#canister-http-interface) feature provides a way for canisters to directly interact with
applications and data exist outside of Internet Computer. This [Exchange Rate](https://github.com/dfinity/examples/tree/master/rust/exchange_rate) sample dapp is created to demonstrate usage of the new Canister HTTP feature.

It pulls ICP <-> USDC exchange rate from a single resource currently - the [Coinbase Pro API](https://api.pro.coinbase.com/products/ICP-USD/candles). The number of data sources can be easily extended as the needed for 
decentralization purpose. But for the sample purpose, we are only using one data source.

## What does the sample dapp do
There are two parts to the sample dapp:
1. the frontend UI cansiter `exchange_rate_assets`, which includes a time range picker and a rate chart
2. the backend provider canister `exchange_rate`, which does the real HTTP request calls, queues jobs, as well
as process data slightly.

Upon receiving a request from UI, the request is then passed from the frontend to the backend for queueing. 
There is asynchronous process triggered at every few Internet Computer heartbeats, to make a Coinbase API HTTP
request call. To save the overall number of remote HTTP calls needed, each HTTP request pulls exactly 200 data 
points from Coinbase, which sits in the Coinbase maximum number of data points range, intervaled at 1 minute each.
As a result, each HTTP request to Coinbase covers 200 minutes of data. The fetched data points are then put into
a timestamp to rate hashmap, ready for future user requests to directly read from.

If the user interested time range is longer than a couple of years, the data points to be returned
by backend `exchange_rate` canister could potentially be out of canister response upper limit (2MB).
As a result, we cap number number of data points to be returned by the backend `exchange_rate` canister to
the frontend `exchange_rate_assets` canister, and increase the sample interval to cover the full spectrum of 
interested range.

## How to use the sample dapp

Users should be able to interact with only the frontend UI canister, by selecting the start time 
and the end time with the datetime pickers.

The returned rates may not exactly match the users time selection. (There could be gaps in between
data points, or there could be smaller range being returned, or if lucky enough, the returned
dataset fully matches user's interest.) The reason for that is because, to respect rate limiting
on the remote service, we scatter our calls to remote service once per every IC heartbeats.
Consequently, the rate pulling can be a relatively-long asynchronous process. We store all the
previously-pulled rates into memory. As the user submits their interest, the rates that are already
available from previous pulls will be returned, while the ones that are not yet available will be
pulled in parallel. If the user spots gaps between requested rates and returned rates, the user
simply wait for some time and retry the request, and likely the full rates will be available then.

## Exchange Rate architecture
![Architecture overview diagram of the Exchange Rate dapp](_attachments/exchange_rate_arch.png)

## Cost analysis of the `exchange_rate` canister
This `exchange_rate` canister is designed to be as cost effective as possible. There are 2 major factors
affect cycles usage when it comes to Canister HTTP Request feature:
- The number of requests being made
- The size of each request and response

And between these 2 factors, the first one (number of remote requests made) has a much higher
effect on cycles cost. So the goal of the canister is to:
- Make as little remote calls as possible
- Make each remote HTTP call as small as possible

However, note that these 2 goals are conflicting each other. Consider 1 year's exchange rate
data, that is a static amount of data needs to be downloaded. The less remote calls we make, the
bigger amount of data each call needs to fetch. The less amount of data each call fetches, the
more remote call the canister has to make. And we bias towards the 1st approach, which is
maximize data fetched by each call as possible, to reduce number of calls needed. For the reason
mentioned above, that the number of calls cost much more than call size.

On top of that, we cache data that's already fetched, to save from future user requests
triggering remote HTTP calls again.

## Building and deploy sample dapp locally

- `dfx start --enable-canister-http` to start a local IC instance with Canister HTTP feature enabled
- `dfx deploy --with-cycles 100000000000` to deploy the `exchange_rate` and `exchange_rate_assets`
  canisters to local IC
- `dfx canister status exchange_rate` to check the status of the canister
