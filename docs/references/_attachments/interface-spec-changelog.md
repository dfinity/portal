## Changelog {#changelog}

## 0.18.7 (2022-09-27) {#0_18_7}
* HTTP request API
* Reserved principals

## 0.18.6 (2022-08-09) {#0_18_6}
* Canister access to performance metrics
* Query calls are rejected when the canister is frozen
* Support for implementation-specific error codes for requests
* Deleted call contexts do not prevent canister from reaching Stopped state
* Update effective canister id checks in certificate delegations
* Formal model in Isabelle

## 0.18.5 (2022-07-08) {#0_18_5}
* Idle consumption of resources in cycles per day can be obtain via `canister_status` method of the management canister
* Include the HTTP Gateway Protocol in this spec
* Clarifications in definition of cycles consumption

## 0.18.4 (2022-06-20) {#0_18_4}

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
