## Changelog {#changelog}

### ∞ (unreleased)
* Allow anonymous query and read state requests with invalid `ingress_expiry`.
* Add allowed viewers variant to canister log visibility.
* Deprecate the Bitcoin API of the management canister.

### 0.28.0 (2024-10-11) {#0_28_0}
* Add new management canister methods for canister snapshot support.

### 0.27.0 (2024-09-20) {#0_27_0}
* EXPERIMENTAL: Management canister API to fetch Bitcoin block headers.
* Synchronous update call API at `/api/v3/canister/.../call`.

### 0.26.0 (2024-07-23) {#0_26_0}
* EXPERIMENTAL: Management canister API for threshold Schnorr signatures.

### 0.25.0 (2024-06-14) {#0_25_0}
* Query call statistics.
* New `wasm_memory_persistence` option for canister upgrades.
* Rename `num_blocks_total` to `num_blocks_proposed_total` in node metrics served by the management canister.
* Management canister query call to fetch canister logs.
* WASM heap memory limit in canisters settings.
* 32-bit stable memory System API is marked DEPRECATED.
* Remove the management canister query calls `bitcoin_get_balance_query` and `bitcoin_get_utxos_query`.

### 0.24.0 (2024-04-23) {#0_24_0}
* Wrap chunk hash for install chunked code in a record and rename `storage_canister` to `store_canister`.
* Update subnet read state request conditions on requested paths.
* Fix: allow inter-canister calls (requests) to be spontaneously rejected in the abstract spec.

### 0.23.0 (2024-03-06) {#0_23_0}
* The maximum length of a nonce in an ingress message is 32 bytes.
* Update specification of responses from the endpoint `/api/v2/status`.
* Stop canister calls might be rejected upon timeout.
* The IC sends a `user-agent` header with the value `ic/1.0` in canister HTTPS outcalls if the canister does not provide one.
* Add a management canister method for retrieving node metrics.
* Specify the resource reservation mechanism.
* Allow `in_replicated_execution` system API method to be executed during `canister_start`.
* Set the maximum depth of a delegation in a read_state response/certified variable certificate to 1.
* Canister version is guaranteed to increase if the canister's running status changes.
* Calls to frozen canisters are rejected with `SYS_TRANSIENT` instead of `CANISTER_ERROR`.
* Add API boundary nodes information into the certified state tree.

### 0.22.0 (2023-11-15) {#0_22_0}
* Add metrics on subnet usage into the certified state tree and a new HTTP endpoint `/api/v2/subnet/<subnet_id>/read_state` for retrieving them.
* Add management canister methods to support installing large WebAssembly modules split into chunks.
* Add a system API method to determine if the canister is running in replicated or non-replicated mode.
* Add a system API method to burn cycles of the canister that calls this method.
* Add a check that a canister receiving an ingress message is Running before the ingress message is marked as Received.
* Increase the maximum number of globals in a canister's WASM.
* Add per-call context performance counter.
* Update the computation of the representation-independent hash for the case of maps with nested maps.
* Remove `senders` field from user delegations.

### 0.21.0 (2023-09-18) {#0_21_0}
* Canister cycle balance cannot decrease below the freezing limit after executing `install_code` on the management canister.
* System API calls `ic0.msg_caller_size` and `ic0.msg_caller_copy` can be called in all contexts except for (start) function.
* Added note on confidentiality of values in the certified state tree.
* Update algorithm computing the request and response hash in the HTTP Gateway including clarification of when the HTTP Gateway can allow for arbitrary certification version in the canister's response.
* Update conditions on requested paths in HTTP read state requests.
* Added new query methods in the Bitcoin API.
* Added node public keys to certified state and node signatures to query call responses.
* Added a new mode for canister upgrades skipping pre-upgrade method's execution.

### 0.20.0 (2023-07-11) {#0_20_0}
* IC Bitcoin API, ECDSA API, canister HTTPS outcalls API, and 128-bit cycles System API are considered stable.
* Add conditions on requested paths in read state requests.
* Add composite queries.
* Specify that the canister version is incremented upon every successful message execution except for successful message execution of a query method.

### 0.19.0 (2023-06-08) {#0_19_0}
* canister version can be specified in some management canister calls (canister creation, canister code changes, canister settings changes)
* IC records canister history (canister creation, canister code changes, and canister controllers changes)
* added a new `canister_info` management canister call returning current module hash, current controllers, and canister history
* added a new system API call `ic0.is_controller` (checking if a principal is a controller of the canister)
* stable memory System API calls can be invoked in the WebAssembly module `(start)` function
* the system API call `ic0.global_timer_set` can be invoked in canister pre-upgrade
* added modeling WASM start function in the concrete `CanisterModule` specification
* WebAssembly module requirements have been revised (relaxed max number of declared functions and globals, added conditions on exported functions)
* certified variables are cleared if a canister is reinstalled
* a canister having an open call context marked as deleted cannot reach Stopped state
* a desired canister ID of the canister created by `provisional_create_canister_with_cycles` (in testing environments) can be specified using `specified_id`
* conditions on envelope delegations have been revised (relaxed max number of delegations, restricted max number of targets per delegation, forbidden cycles in the delegation chain)
* added a new optional field `senders` in envelope delegations (restricting users to which a delegation applies)
* all `/request_status/<request_id>` paths must refer to the same `request_id` in a `read_state` request
* IC protocol execution error conditions (such as failing `inspect_message` method of a canister) are returned as 200 HTTP responses with a cbor body describing the error (instead of 4xx or 5xx HTTP responses)

### 0.18.9 (2022-12-06) {#0_18_9}
* Global timers
* Canister version
* Clarifications for HTTP requests & Bitcoin integration costs

### 0.18.8 (2022-11-09) {#0_18_8}
* Updated HTTP request API
* Canister status available to canister
* 64-bit stable memory is no longer experimental

### 0.18.7 (2022-09-27) {#0_18_7}
* HTTP request API
* Reserved principals

### 0.18.6 (2022-08-09) {#0_18_6}
* Canister access to performance metrics
* Query calls are rejected when the canister is frozen
* Support for implementation-specific error codes for requests
* Deleted call contexts do not prevent canister from reaching Stopped state
* Update effective canister id checks in certificate delegations
* Formal model in Isabelle

### 0.18.5 (2022-07-08) {#0_18_5}
* Idle consumption of resources in cycles per day can be obtain via `canister_status` method of the management canister
* Include the HTTP Gateway Protocol in this spec
* Clarifications in definition of cycles consumption

### 0.18.4 (2022-06-20) {#0_18_4}

* Canister cycle balances are represented by 128 bits, and no system-defined upper limit exists anymore
* Canister modules can be gzip-encoded
* Expose Wasm custom sections in the state tree
* EXPERIMENTAL: Canister API for accessing Bitcoin transactions
* EXPERIMENTAL: Canister API for threshold ECDSA signatures

### 0.18.3 (2022-01-10) {#0_18_3}

* New System API which uses 128-bit values to represent the amount of cycles
* Subnet delegations include a canister id scope

### 0.18.2 (2021-09-29) {#0_18_2}

* Canister heartbeat
* Terminology changes
* Support for 64-bit stable memory


### 0.18.1 (2021-08-04) {#0_18_1}

* Support RSA PKCS#1 v1.5 signatures in web authentication
* Spec clarification: Fix various typos and improve textual clarity


### 0.18.0 (2021-05-18) {#0_18_0}

* A canister has a set of controllers, instead of always one


### 0.17.0 (2021-04-22) {#0_17_0}

* Canister Signatures are introduced
* Spec clarification: the signature in the WebAuthn scheme is prefixed by the CBOR self-identifying tag
* Cycle-depleted canisters are forcibly uninstalled
* Canister settings in `create_canister` and `update_settings`. `install_code` no longer takes allocation settings.
* A freezing threshold can be configured via the canister settings

### 0.16.1 (2021-04-14) {#0_16_1}
* The cleanup callback is introduced

### 0.16.0 (2021-03-25) {#0_16_0}

* New http v2 API that allows for stateless boundary nodes

### 0.15.6 (2021-03-25) {#0_15_6}

* The system may impose limits on the number of globals and functions
* No ingress messages towards empty canisters are accepted
* No ingress messages towards `raw_rand` and `deposit_cycles` are accepted
* A memory allocation of `0` means “best effort”


### 0.15.5 (2021-03-11) {#0_15_5}

* deposit_cycles(): any caller allowed


### 0.15.4 (2021-03-04) {#0_15_4}

* Ingress message filtering
* Add ECDSA signatures on curve secp256k1
* Clarify that the `ic0.data_certificate_present` system function may be
  called in all contexts.


### 0.15.3 (2021-02-26) {#0_15_3}

* Expose module hash and controller via `read_state`


### 0.15.2 (2021-02-09) {#0_15_2}

* The document is renamed to “Internet Computer Interface Spec”


### 0.15.0 (2020-12-17) {#0_15_0}

* Support for raw Ed25519 keys is removed


### 0.14.1 (2020-12-08) {#0_14_1}

* The default `memory_allocation` becomes unspecified


### 0.14.0 (2020-11-18) {#0_14_0}
 
* Support for funds is scaled back to only support cycles
* The `ic0.msg_cycles_accept` system call now returns the actually accepted
  cycles
* The `provisional_` management calls are introduced


### 0.13.2 (2020-11-12) {#0_13_2}

* The `ic0.canister_status` system call


### 0.13.1 (2020-11-06) {#0_13_1}

* Delegation between user public keys


### 0.13.0 (2020-10-19) {#0_13_0}

* Certification (also removes “request-status” request)


### 0.12.2 (2020-10-23) {#0_12_2}

* User authentication method based on WebAuthn is introduced
* User authentication can use ECDSA
* Public keys are DER-encoded


### 0.12.1 (2020-10-16) {#0_12_1}

* Return more information in the `canister_status` management call


### 0.12.0 (2020-10-13) {#0_12_0}

* Anonymous requests must have the sender field set


### 0.11.1 (2020-10-01) {#0_11_1}

* The `deposit_funds` call


### 0.11.0 (2020-09-23) {#0_11_0}

* Inter-canister calls are now performed using a builder-like API
* Support for funds (balances and transfers)


### 0.10.3 (2020-09-21) {#v0_10_3}

* The anonymous user is introduced


### 0.10.1 (2020-09-01) {#v0_10_1}

* Forward-port changes from 0.9.3


### 0.10.0 (2020-08-06) {#v0_10_0}

* Users can set/update a memory allocation when installing/upgrading a canister.
* The `expiry` field is added to requests


### 0.9.3 (2020-09-01) {#v0_9_3}

* The management canister supports the `raw_rand` method


### 0.9.2 (2020-08-05) {#v0_9_2}

* Canister controllers can stop/start canisters and can query their status.
* Canister controllers can delete canisters


### 0.9.1 (2020-07-20) {#v0_9_1}

* Forward-port changes from 0.8.2


### 0.9.0 (2020-07-15) {#v0_9_0}

* Introduction of a domain separator (again)
* The calculation of “derived ids” has changed
* The self-authenticating and derived id forms use a truncated hash
* The textual representation of principals has changed


### 0.8.2 (2020-07-17) {#v0_8_2}

* Installing code via `reinstall` works also on the empty canister


### 0.8.1 (2020-07-10) {#v0_8_1}

* Reflect refined process in README and intro.
* `ic0.time` added


### 0.8.0 (2020-06-23) {#v0_8_0}

* Revert the introduction of a domain separator


### 0.6.2 (2020-06-23) {#v0_6_2}

* Fix meaning-changing typos in `ic.did`


### 0.6.0 (2020-06-08) {#v0_6_0}

* Make all canister ids system-chosen
* HTTP requests for management features are removed


### 0.4.0 (2020-05-25) {#v0_4_0}

* (editorial) the term “principal” is now used for the _id_ of a canister or
  user, not the canister or user itself
* The signature of a request needs to be calculated using a domain separator
* Describe the `controller` attribute, add a request to change it
* The IC management canister is introduced


### 0.2.16 (2020-05-29) {#v0_2_16}

* More tests about calls from query methods


### 0.2.14 (2020-05-14) {#v0_2_14}

* Bugfix: Mode should be `reinstall`, not `replace`


### 0.2.8 (2020-04-23) {#v0_2_8}

* Include section with CDDL description


### 0.2.4 (2020-03-23) {#v0_2_4}

* simplify versioning (only three components), skip 0.2.2 to avoid confusion with 0.2.0.2
* Clarification: `reply` field is always present
* General cleanup based on front-to-back reading


### 0.2.0.0 (2020-03-11) {#v0_2_0_0}

* This is the first release. Subsequent releases will include a changelog.
