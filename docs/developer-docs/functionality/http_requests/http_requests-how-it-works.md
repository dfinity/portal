# Technology Overview -- How Canister HTTP Requests Work

We next give some more details on how canister HTTP requests work and important aspects to consider when using the API. We already want to note here that there are some limitations compared to regular computer programs making HTTP outcalls and considerations a programmer needs to consider for successfully using this feature. Engineers who want to work with this feature are advised to read through this documentation to get up to speed quickly w.r.t. the feature.

## Overview

The feature allows canisters to make outgoing HTTP calls to conventional Web 2.0 HTTP servers. The response of the request can be safely used in computations, without the risk of state divergence on the subnet. This is crucial, as it has required us to overcome some challenges which have so far prevented blockchains from implementing this feature. This is achieved by pushing an (optionally-transformed) instance of the received HTTP response through the Internet Computer's consensus on each replica, so that the replicas of the subnet can agree on the response provided to the canister. The optional transformation ensures that, if responses received on different replicas from the server are different in some parts, those differences are removed and the same transformed responses are given to consensus on every (honest) replica. This guarantees that on every replica the exact same, or no, response is received by the canister and used in further processing, thereby ensuring that divergence does not happen when using this feature and the replicated state machine properties of the subnet are preserved. To summary, by running the responses through consensus, we ensure that every replica provides the same response to the execution environment where smart contract code is executed, and the optional transformation function makes sure that the response makes it through consensus.

The canister HTTP requests feature is implemented as part of the replica and is exposed as an API on the management canister. We next outline how a request is processed by the system. The HTTP request functionality is realized at the level of subnets, i.e., each subnet handles canister HTTP requests independently of other subnets.
* A canister makes an HTTP outcall request with the management canister API `http_request`.
* The request is stored temporarily in replicated state of the subnet.
* Periodically (each round) an *adapter* at the networking layer in each replica fetches the pending HTTP outcalls from replicated state. (In fact, a 'shim' layer of the adapter that is inside the replica process does so as the adapter itself is security sandboxed into a separate OS-level process for security reasons.)
* The adapter on each replica executes the request by sending it to the target server.
* The HTTP response to a request is received from the server by the adapter on each replica of the subnet. The adapter limits the response size to `max_response_bytes` which defaults to 2MB and can be set to lower values. It is important to set this as low as reasonably possible for the expected response as it affects the price of the request.
* An optional transformation function implemented as part of the canister is invoked on the response on each replica to transform it.
* The transformed response is handed over to consensus on each replica.
* Consensus agrees on a response if at least $2/3$ of the replicas have the same response for the request as input and provides this response back to the management canister API at the execution layer, or an error if no consensus can be reached or in case of other problems.
* The execution layer provides the response or error back to the calling canister.

As we can see, the transformation function and IC consensus play a crucial role here: The transformation function ensures that differences in the responses received by the replicas are removed and transformed responses on all replicas will be exactly equal. Consensus then can agree on those equal responses and, if at least $2/3$ of the replicas are honest, will agree on the response, in which case it can be provided to the calling canister.

The trust model for canister HTTP outcalls is a combination of the trust model of the called HTTP server and the IC:
* It is assumed that the HTTP service is honest, otherwise, it can provide any responses to any of the calling replicas of the subnet. This is the case also for calls to the service from a Web 2.0 service or an oracle, thus, the situation is not worse in our scenario of a blockchain making the call to the service.
* The trust model of the IC assumes that at least $2/3$ of the replicas are honest. In this case, the honest replicas will obtain the same response (after optional transformation) and consensus will be able to agree on the response so that the response can be provided back to the calling canister.
A dishonest server can easily make requests fail or provide wrong data. Also, $1/3$ or more of dishonest subnet replicas can make requests fail. For providing wrong data, more than $2/3$ of the replicas need to be compromised.

The programming model of this feature is such that the canister making an HTTP outcall acts as *HTTP client*, i.e., needs to interpret various headers and act accordingly. For use cases such as API requests this is rather straightforward and does not require any specific considerations in the common case. The IC protocol stack can be simply seen as a communication pipe between the canister and the conventional HTTP server that makes sure that the response goes through consensus and all honest replicas receive the exact same response.

## Comparison with Oracles

Blockchain oracles, or just oracles, are external parties that interact with the blockchain by making queries or sending ingress messages, just like any user. They have so far been the main means in the blockchain world of letting smart contracts communicate with traditional Web 2.0 servers.

The basic architecture is that an oracle smart contract is deployed on chain. Users make requests to this oracle contract which stores them. An oracle, i.e., Web 2.0 server, obtains the request from the oracle smart contract through normal interaction with the smart contract using queries and update calls. Then the oracle executes the request in the Web 2.0 world and provides back the response, again using the normal interaction paradigm with the blockchain (update call). Then the oracle smart contract provides back the response to the calling smart contract, which concludes how oracles typically work.

In the oracle architecture, a single oracle may fulfill the original request, or a decentralized network of oracles may each make the request and then a consented-on response is provided (including evidence) to the oracle contract and ultimately to the calling canister. As we can see, the oracle world effectively can achieve the same result, but with a more complex architecture of requiring one or more external parties that each wants to be paid for their services. Thus, one can assume that HTTP outcalls can replace oracles for many relevant use cases in a stronger trust model and with lower fees and request execution latency.

Oracle services like ChainLink provide additional functionality. One example is using multiple data sources for a given information item, e.g., an asset price, and then providing a normalized response, e.g., the median price, as a result. Another example is keeping historic prices that have been retrieved on chain for direct access by smart contracts without any oracle interaction. Both those functionalities can be easily built with the canister HTTP outcalls feature and do not require oracles.

Overall, the canister HTTP outcalls feature allows us to achieve what oracles or oracle networks achieve, but in a stronger model without requiring additional parties that are additional points of failure and want to get fees for their services. With the canister HTTP requests feature, interactions with Web 2.0 servers will  benefit from reduced fees and also lower latency due to the simpler architecture.

### Benefits for Developers

For developers the canister HTTP requests feature has the benefit that they do not need to make a decision on which party (oracle) they want to trust in addition to the IC that they already need to rely on. They don't need to decide on whether they want to use a single oracle or multiple oracles to reduce trust assumptions and get better decentralization, but they get this out of the box with HTTP outcalls. The cost of the HTTP outcall is likely much lower than paying an oracle provider for their services and the associated ingress cost, thus we have a clear economic advantage to go for HTTP calls. Freed from making all those non-trivial trust decisions, a developer can focus on their business logic and simply make the HTTP call they need (and write a corresponding transform function), which is more natural.

### Benefits for End Users

End users can benefit from HTTP outcalls in various ways as well.
* *Stronger trust model:* They get stronger security by not relying on any additional parties which introduce further points of failure and thereby having better decentralization. The decentralization we get using HTTP outcalls is the best we can achieve as it only involves the subnet replicas and the external service to be called, but no third parties such as oracle services.
* *Lower fees:* Users get a cheaper service as oracle middlemen are cut out in the calculation.
* *Lower latency:* The latency of direct HTTP calls is lower than making an (Xnet) request to an oracle contract that then gets polled and serviced by an external oracle service, which materializes in a better user experience when interacting with the canister. This is pronounced for Xnet requests, which need to be done unless the oracle provider sets up an oracle smart contract on evert relevant subnet, which would somwehat counter the architecture principles of the IC.

## Known Limitations

The current MVP has still some limitations that we need to make explicit s.t. engineers know what they can expect from the feature and whether they can apply it for a given use case.

### Responses Must be &ldquo;Similar&ldquo;

Responses the replicas of the subnet receive must be &ldquo;similar&ldquo; in the sense that each response can be subjected to the same transformation function and the outcome will be equal on every replica. Thus, "similar" in this context means that some core information we are interested in is equal in all responses and other parts may differ. A common setting is that the responses are structurally equivalent, but contain certain fields that differ in the responses, e.g., because of timestamps and identifiers contained in the responses.

### POST Requests Must be Idempotent

The way the feature is implemented requires that every HTTP request be made by every replica of the subnet. This not only applies to `GET`, but also to `POST`, requests and for the latter creates a challenge that we do not have for `GET` requests: A `GET`, if implemented properly, i.e., according to basic HTTP principles, is idempotent, i.e., if made multiple times, yields the same result and does not change anything, but this does not apply to `POST` in the general case. I.e., without further precautions, a `POST` made from a canister could result in the request leading to an update on the called server $n$ times, with $n$ the number of replicas in the subnet. This behaviour is clearly not intended, nor would it be acceptable in most scenarios.

One standard solution used in practice for such scenarios is the use of an *idempotency key* in the request. This key is a unique random string in a header sent along with all resulting requests by the different replicas. The server identifies all but one of the requests as duplicates and those are not considered for changing the state on the server, only one of them is. This results in exactly the intended behaviour of the `POST` being applied exactly once by the server. However, note that this single request being processed by the server can actually be the request made by a compromised replica and thus not be the intended request. Also, the compromised replica may change the idempotency key and thus lead to its request and the actual intended request getting processed by the server.

Idempotency keys are supported by some servers, but definitely not by all. The applicability of idempotency keys needs to be evaluated on a case-by-case basis. The challenge of idempotency can be mitigated with a future extension of this feature allowing for a *reduced quorum*. That is, the canister could define the quorum size to be 1 and have only 1 replica execute the `POST` request. The issue with dishonest replicas still remains, but the idempotency issue gets solved with this extension.

Making a secure read back operation via a `GET` to check whether the request has been properly executed helps mitigate some of the challenges. However, a compromised replica making an update on a completely different portion of the state can not reliably be detected using this approach.

### Compromised Replicas

As already hinted at above, a compromised replica is a more general problem: Such replica can at any point in time make arbitrary `POST` requests that the canister is not even aware about to the service. I.e., whenever we have an API key or password stored for authenticating to the external server, we run into the problem that a compromised replica can use the plaintext credentials to authenticate to the server.

Note, however, that this problem cannot be easily solved with oracles either: A compromised oracle can do exactly the same as a compromised replica. Multiple oracles do not solve the problem either for `POST`s. Solving this requires either advanced (cryptographic) mechanisms such as threshold TLS being used or some support from the side of the server. E.g., the server could keep a log of all state changes being done and the canister can read back this log securely and at least detect calls made by compromised replicas. Tracking the IP address of the requestor may help in identifying the faulty replica and taking legal and other action against it.

### IPv6-Only Support

Currently, as the IC itself is an IPv6-only system, the canister HTTP outcalls feature is, in analogy, an IPv6-only feature. IPv4 support may be added in the future depending on demand from the community. The main reason for not supporting IPv4 now is that we do not have enough IPv4 addresses such that every replica of the IC could get its own IPv4 address and thus we would need to either go over boundary nodes or use other mechanisms to allow for IPv4 communications. Any of those approaches leads to a reduced decentralization compared to replicas directly communicating with the Web 2.0 server.

### Rate Limiting by Servers

Most Web servers offering services to the general public implement some sort of rate limiting. Rate limiting means to constrain how many requests can be made from an IPv4 address or IPv6 prefix in a given time interval. Once the quota is used up, requests from this IP or prefix would not be served, but an according error would be served instead.

The problem is that all canisters on a subnet share the IPv6 prefixes of the replicas of this subnet and thus the quota at each server that implements rate limiting. Typical quotas of HTTP services for public (unauthenticated) users are in the order of $10$ requests per second. As every replica makes the same request, we have an amplification factor of $n$, where $n$ is the number of replicas in the subnet. Thus, the quotas can get consumed quickly and rate limits apply.

Using a registered user and authorizing the requests with an API key can decouple users on the same server and give each of them their own quota, thereby solving the issue with public APIs. Note, however, that the API key is stored in every replica and may be exposed in case a replica is compromised. This needs to be considered in the security model of the smart contract and is specifically relevant for `POST` operations.

We do currently not implement any rate limiting in the IC protocol stack as we think the use of registered users may resolve many if not most / all of the issues with rate limiting of public APIs and all canisters sharing the service's quota.

## Future Extensions

As mentioned already further above, there are multiple possible extensions we are considering to implement in the future, based on demand in the community. The current MVP does not include them as it allows us to go to market faster because of the reduced feature set.
* *IPv4 support:* IPv4 support would help canisters reach servers that are not available on IPv6, but IPv4 only.
* *Reduced quorum:* A canister can define that a reduced quorum should be used for a request, e.g., only $1$ replica of the subnet making the request instead of all $n$ replicas. This trivially helps resolve the idempotency problem with `POST` requests. It may also be interesting for making reads where trust does not matter, but where we want to reduce the request amplification instead, e.g., because of quotas the server has in place.

## Implementing Canister HTTP Requests

We next provide important information for engineers who want to use canister HTTP requests in their smart contracts. Using canister HTTP requests is somewhat harder than doing HTTP requests in a regular enterprise application as we need to consider aspects like consensus and idempotency of `POST` requests.

### Recipe for Implementing a Canister HTTP Call

The following "recipe" gives you a blueprint at how to best tackle the implementation of a new canister HTTP outcall type.
* "Manually," e.g., using the `curl` tool, make the same HTTP request of interest twice within a short time frame (1-2 seconds) to emulate what would happen by the replicas of a subnet, just with a smaller $n$.
* Diff the two responses to find all the things that differ in the two requests. Both the body and the headers are important to be considered. Alternatively, identity the core information of interest and how it can be extracted as the response.
* Implement a transformation function that transforms responses such that they are equal on each replica based on the observed diff of the responses or the intended response.
* Determine the maximum response size of the server's for this type of request to populate the `max_response_bytes` parameter with it. This often works well for API calls and is important to not overcharge the canister in terms of cycles. The `HEAD` request type can be used to do this if responses change dynamically in response size considerably.
* Try out making the request in the local SDK environment. However, note that the behaviour of the local environment does not fully reflect that of the IC as there is only one replica in the local environment and $n$, e.g., $n=13$, replicas on an IC subnet.

:::note
**Pro tip:** Do not forget to consider response headers when identifying the variable parts of your response because headers sometimes contain variable items such as timestamps which may prevent the responses to go through consensus.
:::

### Debugging

Developers new to the feature are likely to run into certain problems in the beginning. We list the ones we think are the most prominent ones. Note specifically that if a specific type of canister HTTP request works in the local dfx environment, it may still not work on the IC because the local environment runs $1$ replica, whereas the IC runs $n=13$ replicas on the regular application subnets. Problems here are to be expected when developing such calls, particularly when a developer has not yet gained the necessary experience of working with the feature. Note that this difference between the dfx environment and a deployment on the IC is not going to change any time soon as it results from the way the dfx works: It runs a single replica locally, with all the pros and cons during the engineering process.
* *Not reaching consensus on responses for a given request:* If the requests returned by the service are "similar" as required by the feature, this is most likely caused by an error in the transformation function, i.e., the transformed responses are still not equal on sufficiently many honest replicas. This is best debugged by diffing multiple requests made to the service and ensuring the transformation function does not retain any of the variable parts in the transformation result.
* *Requests consume too many cycles:* Canister HTTP requests are not a cheap feature to use, but if requests with rather small responses frequently cost large amounts of cycles, the likely cause is that the `max_response_size` parameter is not set in the response. Always set this parameter to a value as close as possible to the actual maximum response size as possible, and make sure it is at least as large and not smaller. The response size comprises both the body and the headers and refers to the network response from the server and not the response to the canister.

### Transformation Function

The purpose of the transformation function is to transform each response $r_i$ received by replica $i$ where the $r_i$ s of different replicas may be different. The transformation function transforms a response $r_i$ to a transformed response $r'_i$ with the intention that all $r'_i$ s of honest replicas be equal in order to be able to agree on it with IC consensus. Depending on the purpose of the request, there are different approaches to writing the transformation function:
* Extract only the information item(s) of interest. This can, e.g., be a list of pairs of the form date and asset price to be forwarded to the canister. This approach makes sense if the full HTTP response is not required in the canister.
* Remove all variable parts of the request individually and retain all the remaining parts. The canister then extracts the relevant information. This may be useful when the canister still needs to structure of the HTTP request and the headers.
We recommend to go with the first approach whenever possible as it has multiple advantages. Calls to pricing and other APIs should mostly work with the first approach.
* The resulting response is smaller in size.
* The transformation function is faster to compute, that is, the function (query) is executing with fewer CPU cycles. Note that queries are likely to be charged for in the future.
* The transformation function is easier to implement, e.g., through a simple or few Json operations on the response body.

### Pricing

FIX: update with the new pricing model, likely cheaper
As (almost) every feature of the IC, the canister HTTP request feature is charged for when being used. The current pricing is defined to charge a base fee of $400M$ cycles for an HTTP request in addition to $100K$ cycles per request byte and per `max_response_bytes` byte. Because of the fixed cost and the overhead of HTTP requests including headers, it is advantageous to make fewer larger requests to retrieve the same amount of information than with more smaller requests, if this is feasible from the application perspective. The cycles provided with the call must be sufficient for covering the cost, remaining cycles are returned to the caller.

### Errors

There are a number of error cases that can happen when using this feature. The most prominent ones are listed next.
* FIX: list

If you are experiencing issues that are not yet described in the documentation or have other suggestions for improvement of the documentation that may help engineers use the feature effectively, please let us know about it in the [forum topic](https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670) for canister HTTP requests.
