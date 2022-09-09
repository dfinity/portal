# Glossary

## A

##### account

A ledger **account** is a set of entries in the [ ledger
canister](#ledger_canister "wikilink"), which is a smart contract that
mimics the guise and behavior of a regular banking account, whose unit
of measure is [ ICP](#ICP "wikilink") (Internet Computer Protocol)
utility tokens. Ledger accounts are owned by [
principals](#principals "wikilink"), and their ownerships do not change
over time. Every account on the ledger has a positive [
balance](#balance "wikilink") measured in ICP with a precision of eight
decimals.

##### address

In the context of [transactions](#transaction "wikilink") on the ledger,
**address** is synonymous with [ account](#account "wikilink").

##### actor

An **actor** is a primitive in the [Actor
Model](https://en.wikipedia.org/wiki/Actor_model). It is a process with
encapsulated state that communicates with other concurrently running
actors through asynchronous messages that are received sequentially. The
Actor Model is relevant to the [IC](#Internet_Computer_(IC) "wikilink")
because [canisters](#canister "wikilink") on the IC (a type of smart
contract) follow the Actor Model for concurrent and asynchronous
computation.

## B

##### balance

The **balance** of an [ account](#account "wikilink") on the ledger is
the sum of all deposits minus the sum of all withdrawals. As a
degenerate case, it is sometimes useful to say that an account which is
not present in the ledger has a balance of zero.

The balance of a ledger account is denominated in ICP and is represented
with eight decimals. Thus, the minimum positive balance of an account is
0.00000001 or 10^-8 [ ICP](#ICP "wikilink"); this amount is sometimes
referred to as one **e8**.

##### batch

A **batch** is a collection of [ messages](#messages "wikilink") whose
order is agreed upon by [ consensus](#consensus "wikilink").

##### beneficiary

The **beneficiary** of an [ account](#account "wikilink") is the [
principal](#principal "wikilink") who owns the [
balance](#balance "wikilink") of the account. The beneficiary of an
account cannot be changed. The beneficiary of an account may or may not
be allowed to make [transactions](#transaction "wikilink") on the
account (see [ fiduciary](#fiduciary "wikilink")).

##### blockchain

A **blockchain** is a growing list of cryptographically linked blocks,
agreed upon by [ consensus](#consensus "wikilink"). On the [ Internet
Computer](#Internet_computer "wikilink") every [
subnet](#subnet "wikilink") is a blockchain and these blockchains
interact using [ chain key cryptography](#chain_key "wikilink").

#### boundary nodes

**boundary nodes** Nginx gateways to the internet computer. These nodes
act as HTTP routers through which the network’s
[subnet](#subnet "wikilink") blockchain nodes can be reached. The
boundary nodes have several purposes: they aid in discover-ability (the
ic0.app domain name points to a set of boundary nodes), they are
geo-aware and can route incoming requests to the nearest subnet
[node](#node "wikilink") that hosts the [canister](#canister "wikilink")
involved, they can help load balance query
[transactions](#transaction "wikilink"), they can cache
cryptographically verified data in the role of a content distribution
network, they can throttle excessive interactions from an outside IP
address, bootstrapping/Installing the service worker, and they can help
protect subnets from DDoS attacks.

##### burning transaction

A **burning transaction** is the process of "burning" [
ICP](#ICP "wikilink"), whereby a certain amount of ICP are destroyed.
The main use case is that of purchasing [ cycles](#cycles "wikilink"),
through which ICP are destroyed while at the same time a corresponding
amount of cycles is created, using the current exchange rate between ICP
and ([ SDR](#SDR "wikilink")), in such a way that one SDR corresponds to
one trillion (10E12) cycles. It is represented as a [
transaction](#transaction "wikilink") from the source [
account](#account "wikilink") to the [ ICP supply
account](#ICP_supply_account "wikilink").

## C

##### Candid

**Candid** is an IDL crafted specifically for the Internet Computer,
providing a common language for application interfaces to facilitate
communication between services that are written in different programming
languages

##### canister

A **canister** is a type of smart contract that bundles *code* and
*state*. A canister can be deployed as a [ smart
contract](#smart_contract "wikilink") on the [ Internet
Computer](#Internet_Computer "wikilink") and accessed over the Internet.

##### canister account

A **canister account** is a ledger account owned by a [
canister](#canister "wikilink") (i.e. whose
[fiduciary](#fiduciary "wikilink") is a canister). A non-canister
account is a ledger account whose fiduciary is a non-canister
[principal](#principal "wikilink").

##### canister identifier

The **canister identifier** or **canister ID** is a globally-unique
identifier that identifies a [ canister](#canister "wikilink") and can
be used to interact with it.

##### canister signature

A **canister signature** uses a signature scheme based on [ certified
variables](#certified_variables "wikilink"). Public “keys” include a
[canister id](#canister_identifier "wikilink") plus a seed (so that
every [canister](#canister "wikilink") has many public keys); signatures
are certificates that prove that the canister has put the signed message
at a specific place in its state tree. Details in the [The Internet
Computer Interface
Specification](https://smartcontracts.org/docs/interface-spec/#canister-signatures).

##### canister state

A **canister state** is the entire state of a
[canister](#canister "wikilink") at a given point in time. A canister’s
state is divided into *user state* and *system state*. The user state is
a [WebAssembly](#WebAssembly "wikilink") module instance and the system
state is the auxiliary state maintained by the [Internet
Computer](#Internet_Computer "wikilink") on behalf of the canister, such
as its compute allocation, balance of [cycles](#cycles "wikilink"),
input and output queues, and other metadata. A canister interacts with
its own system state either implicitly, such as when consuming cycles,
or through the System API, such as when sending messages.

##### catch-up package (CUP)

A **catch-up package** is a data bundle that contains everything needed
to bootstrap a [subnet](#subnet "wikilink")
[replica](#replica "wikilink").

##### certified query

A **certified query** is a query call for which the response is
certified.

##### certified variable

A piece of data that a [canister](#canister "wikilink") can store in its
[subnet](#subnet "wikilink")’s canonical state in the processing of an
update call (or inter-canister call), so that during the handling of a
[query](#query "wikilink") call, the canister can return a certificate
to the user that proves that it really committed to that value.

##### chain key

**Chain key** cryptography consists of a set of cryptographic protocols
that orchestrate the [nodes](#node "wikilink") that make up the
[Internet Computer](#Internet_Computer "wikilink"). The most visible
innovation of chain key cryptography is that the Internet Computer has a
single public key. This is a huge advantage as it allows any device,
including smart watches and mobile phones, to verify the authenticity of
artifacts from the Internet Computer.

##### consensus

In distributed computing, **consensus** is a fault tolerant mechanism by
means of which a number of [nodes](#node "wikilink") can reach agreement
about a value or state.

Consensus is a core component of the [replica](#replica "wikilink")
software. The consensus layer selects [messages](#messages "wikilink")
from the peer-to-peer artifact pool and pulls messages from the
cross-network streams of other [subnets](#subnet "wikilink") and
organizes them into a [batch](#batch "wikilink"), which is delivered to
the [message routing](#message_routing "wikilink") layer.

##### controller

A **controller** of a [canister](#canister "wikilink") is a person,
organization, or other canister that has administrative rights over the
canister. Controllers are identified by their
[principals](#principal "wikilink"). For example, a controller of a
canister can upgrade the [WebAssembly](#WebAssembly "wikilink") code of
the canister or delete the canister.

##### cycle

On the [Internet Computer](#Internet_Computer "wikilink"), a **cycle**
is the unit of measurement for resources consumed in the form of
processing, memory, storage, and network bandwidth. Every canister has a
cycles account to which resources consumed by the canister are charged.
The Internet Computer’s utility token ([ICP](#ICP "wikilink")) can be
converted to cycles and transferred to a canister. Cycles can also be
transferred between canisters by attaching them to an \[inter-canister\]
message.

ICP can always be converted to cycles using the current price of ICP
measured in \[SDR\] using the convention that one trillion cycles
correspond to one SDR.

## D

##### dapp

A **dapp**, or decentralised application is a
[canister](#canister "wikilink") running on the [Internet
Computer](#Internet_Computer "wikilink").

##### data center

A **data center** (DC) is a physical site that hosts
[nodes](#node "wikilink") which contribute to the [Internet
Computer](#Internet_Computer "wikilink"). It includes the hardware and
software infrastructure required for node deployment. A DC is identified
on the Internet Computer by a unique identifier.

##### dissolve delay

The **dissolve delay** is the amount of time that
[neurons](#neuron "wikilink") must spend [
dissolving](#dissolving_state "wikilink") before becoming [
disolved](#dissolved_state "wikilink").

##### dissolved state

The **dissolved state** is a [neuron](#neuron "wikilink") state
characterized by a [dissolve delay](#dissolve_delay "wikilink") equal to
zero. (It is conventionally said that a neuron in this state does not
"have" a dissolve delay.) It is in this state that a neuron can be
"disbursed," hence its stake moved elsewhere, and its corresponding
[neuron account](#neuron_account "wikilink") closed. The
[age](#neuron_age "wikilink") of a dissolved neuron is considered to be
zero.

##### dissolving state

A **dissolving state** is a [neuron](#neuron "wikilink") state that
follows immediately after its owner issues a "start dissolving" command,
and continues until a "stop dissolving" command is issued, or until the
dissolve delay timer runs out. The [age of a dissolving
neuron](#neuron_age "wikilink") is considered to be zero.

## E

##### execution environment

The **execution environment** is one of the core layers of the
[replica](#replica "wikilink") software.

## F

##### fiduciary

The **fiduciary** of an [account](#account "wikilink") is the
[principal](#principal "wikilink") allowed to make
[transactions](#transaction "wikilink") on the account; as such, it may
be useful to think of it as the *owner* of the account, with the caveat
that it may or may not be the [beneficiary](#beneficiary "wikilink") of
the account. The [neuron account](#neuron_account "wikilink") is a
prominent example of an account for which the beneficiary and fiduciary
do not coincide (the fiduciary is the [governance
canister](#governance_canister "wikilink") while the beneficiary is the
neuron holder). The fiduciary of a (ledger) account does not change over
time.

The distinction between fiduciary and beneficiary is also important for
DeFi dapps (canisters) that interact with the IC ledger: in this case,
the fiduciary is the DeFi canister while the beneficiary is the
individual or organisation (\[\[#principal\|principal) that uses the
DeFi canister’s services.

## G

##### governance canister

The **governance canister** is a [system
canister](#system_canister "wikilink") that implements the
[NNS](#network_nervous_system_(NNS) "wikilink") governance system, i.e.,
among others, stores and manages [neurons](#neuron "wikilink") and
[proposals](#proposal "wikilink"), and implements the NNS
[voting](#voting "wikilink") environment.

## I

##### ICP

The **Internet Computer Protocol** token (ticker "ICP") is the utility
token of the [Internet Computer](#Internet_Computer "wikilink"). ICP
allows the broader internet community to participate in the governance
of the Internet Computer blockchain network by locking ICP in
[neurons](#neuron "wikilink"). ICP can also be converted into
[cycles](#cycles "wikilink"), which are then used to power
[canisters](#canister "wikilink").

##### ICP supply account

The **ICP supply account** is a quasi-fictitious ledger
[account](#account "wikilink") whose balance is always zero. It has a
central role in [ICP](#ICP "wikilink") [burning](#burning "wikilink")
and [minting](#minting "wikilink") operations.

##### identity

An **identity** is a byte string that is used to identify an entity,
such as a [principal](#principal "wikilink"), that interacts with the
[Internet Computer](#Internet_Computer "wikilink"). For users, the
identity is the SHA-224 hash of the DER-encoded public key of the user.
[The Internet Computer Interface
Specification](https://internetcomputer.org/docs/current/references/ic-interface-spec) has more
detail.

##### Internet Identity

**Internet Identity** is an anonymizing blockchain authentication system
running on the [Internet Computer](#Internet_Computer "wikilink").

##### induction pool

The **induction pool** of a [subnet](#subnet "wikilink") blockchain is
the collection of all [input queues](#input_queue "wikilink") of all
[canisters](#canister "wikilink") residing on the subnet.

##### ingress message

An **ingress message** is a [message](#message "wikilink") sent by an
end-user to a [canister](#canister "wikilink") running on a
[subnet](#subnet "wikilink") blockchain. The message is signed by the
secret key corresponding to the end-user’s
[identity](#identity "wikilink") and sent to one of the
[replicas](#replica "wikilink") that participate in the subnet.

##### ingress message history

The **ingress message history** records the current status of every
[Ingress message](#ingress_message "wikilink") processed by a
[replica](#replica "wikilink") and keeps track of whether messages were
successfully included in the [induction
pool](#induction_pool "wikilink") and the responses of executed
messages.

##### input queue

The **input queue** of a [canister](#canister "wikilink") contains all
[messages](#message "wikilink") bound for the canister. See also
[induction pool](#induction_pool "wikilink"). When the canister is
scheduled for execution, messages from its input queue will be executed.

##### inter-canister message

An **inter-canister message** is a [message](#message "wikilink") sent
from one [canister](#canister "wikilink") to another. Inter-canister
messages are different from user-initiated [ingress
messages](#ingress_message "wikilink").

##### Internet Computer (IC)

The **Internet Computer** (IC) is a decentralized blockchain that
provides scalable compute capacity for running
[canisters](#canister "wikilink") through independent [node
providers](#node_provider "wikilink") running [nodes](#node "wikilink")
in geographically distributed [data centers](#data_center "wikilink").

## L

##### ledger canister

The **ledger canister** is a [system
canister](#system_canister "wikilink") whose main role is to store
[accounts](#account "wikilink") and their corresponding
[transactions](#transaction "wikilink").

## M

##### message

A **message** is data sent from one [canister](#canister "wikilink") to
another or from a user to a canister.

##### message routing

The **message routing** layer receives [batches](#batch "wikilink") from
the [consensus](#consensus "wikilink") layer and inducts them into the
[induction pool](#induction_pool "wikilink"). Message routing then
schedules a set of [canisters](#canister "wikilink") to execute messages
from their [input queues](#input_queue "wikilink").

After [messages](#message "wikilink") have been executed, the message
routing layer takes any messages produced in the execution round from
the output queues and puts those messages into the outgoing streams to
be consumed by canisters on other [subnets](#subnet "wikilink").

##### minting transaction

A **minting transaction** is the process of "minting"
[ICP](#ICP "wikilink"), whereby a certain amount of ICP comes into
existence. ICP is minted in order to reward
[neurons](#neuron "wikilink") for [voting](#voting "wikilink"), and
reward [node providers](#node_provider "wikilink") for participating in
the [IC](#Internet_Computer_(IC) "wikilink") by providing compute
capacity through the running of [nodes](#node "wikilink"). A minting
transaction is represented as a [transaction](#transaction "wikilink")
from the [ICP supply account](#ICP_supply_account "wikilink") to a
destination [account](#account "wikilink").

##### Motoko

**Motoko** is a programming language designed to directly support the
programming model of the [Internet
Computer](#Internet_Computer "wikilink"), making it easier to
efficiently build applications and take advantage of some of the more
unusual features of this platform, including the Actor Model for smart
contracts and compilation to WebAssembly.

## N

##### non-dissolving state

A [neuron](#neuron "wikilink") that is not
[dissolved](#dissolved_state "wikilink") or [
dissolving](#dissolving_state "wikilink") is said to be in a
**non-dissolving state** (or "aging"). Non-dissolving neurons thus
accrue "age", with the caveat that beginning to dissolve at any time
reduces this age back to zero. The dissolve delay parameter of a
non-dissolving (aka "aging") neuron cannot be zero, because such a
neuron would have to already be dissolved.

##### network nervous system (NNS)

The **network nervous system** (NNS) is a collection of [system
canisters](#system_canister "wikilink") (aka "NNS canisters") assembled
into a system that governs all aspects of the [Internet
Computer](#Internet_Computer "wikilink").

##### neuron

A **neuron** is an [IC](#Internet_Computer_(IC) "wikilink") entity that
can make [proposals](#proposal "wikilink") and vote on proposals related
to the governance of the [Internet
Computer](#Internet_Computer "wikilink") platform.

To provide the stability required for responsible governance, neurons
need to store ("stake") a certain amount of [ICP](#ICP "wikilink") in
order to be able to make and vote on proposals. This
[locks](#non-dissolving_state "wikilink") the tokens for a period of
time, after which it starts [ dissolving](#dissolving_state "wikilink").
The ICP stake of a neuron is stored in a [neuron
account](#neuron_account "wikilink"). The neuron owner has the right to
propose and vote on governance issues, and is granted rewards for
[voting](#voting "wikilink") in proportion to the amount of ICP staked,
and the duration of the [dissolve
period](#non-dissolving_state "wikilink").

##### neuron account

A **neuron account** is a [canister
account](#canister_account "wikilink") whose
[beneficiary](#beneficiary "wikilink") is a [neuron](#neuron "wikilink")
(or the neuron’s owner). The [governance
canister](#governance_canister "wikilink") is the
[fiduciary](#fiduciary "wikilink") of all neuron accounts.

##### neuron age

The **neuron age** is a [neuron](#neuron "wikilink") parameter roughly
indicative of the time that has passed since its creation or since when
it last entered into a [non-dissolving
state](#non-dissolving_state "wikilink"). Calculation of a neuron’s age
needs to take into account whether the neuron has spent time [
dissolving](#dissolving_state "wikilink") or
[dissolved](#dissolved_state "wikilink"), both of which reset this
parameter.

##### node

A **node** is a physical or virtual network endpoint that hosts all the
hardware, [replica](#replica "wikilink") software, and configuration
settings required to participate in the [Internet
Computer](#Internet_Computer "wikilink").

##### node operator

A **node operator** (NO) is a non-canister
[principal](#principal "wikilink") who has the authority to add/remove
[nodes](#node "wikilink") to/from the
[IC](#Internet_Computer_(IC) "wikilink").

[node providers](#node_provider "wikilink") come in possession of
Hardware Security Modules (HSM), and register the HSMs with the
[NNS](#network_nervous_system_(NNS) "wikilink"). (The HSM registration
process consists essentially in deriving an IC principal ID from the key
stored on the HSM, and persisting that ID with the NNS.) NPs hand
registered HSMs over to legal persons, who now gain the authority to
physically “operate nodes” (aka install
[replicas](#replica "wikilink")). The caveat is that, as opposed to
"regular" principals, where a great deal of care goes into making sure
that one principal ID corresponds to only one person, HSMs can routinely
exchange hands, hence many persons can act as the same NO principal at
different times.

##### node provider

A **node provider** (NP) is a non-canister
[principal](#principal "wikilink") that receives the rewards stemming
from node participation to the [IC](#Internet_Computer_(IC) "wikilink")
(aka “payout principal”). Usually, though not necessarily, a node
provider is the owner of the [node](#node "wikilink"), and may also be
involved in node operation and related tasks. A node provider may
receive rewards from multiple nodes in multiple [data
centers](#data_center "wikilink").

## O

##### output queue

Each [canister](#canister "wikilink") has an **output queue** of
[messages](#message "wikilink") bound for other canisters.

## P

##### peer-to-peer (P2P)

In common usage, **peer-to-peer** (P2P) computing or networking is a
distributed application architecture that partitions workload across a
network of equally-privileged computer [nodes](#node "wikilink") so that
participants can contribute resources such as processing power, disk
storage, or network bandwidth to handle application workload.

The **peer-to-peer layer** collects and disseminates
[messages](#message "wikilink") and artifacts from users and from other
nodes.

The [nodes](#node "wikilink") of a [subnet](#subnet "wikilink") form a
dedicated peer-to-peer broadcast network that facilitates the secure
**bounded-time/eventual delivery** broadcast of artifacts (such as
[ingress messages](#ingress_message "wikilink"), control messages and
their signature shares). The [consensus](#consensus "wikilink") layer
builds upon this functionality.

##### principal

A **principal** is an entity that can be authenticated by the [Internet
Computer](#Internet_Computer "wikilink"). This is the same sense of the
word principal as the [Wikipedia
definition](https://en.wikipedia.org/wiki/Principal_(computer_security)).
Principals that interact with the Internet Computer do so using a
certain [identity](#identity "wikilink").

##### proposal

A **proposal** is a statement describing an action to modify certain
parameters of the [IC](#Internet_Computer_(IC) "wikilink"), or of any of
its subsystems. It is implemented as an IC entity having various
attributes, such as an ID, a URL, a summary etc. Proposals are submitted
by eligible [neuron](#neuron "wikilink") owners for the consideration of
the IC community, and undergo a [voting](#voting "wikilink") process,
following which they can be adopted or rejected. Adopted proposals are
then executed. There are several taxonomies of proposals, the most
prominent of which groups proposals into "topics," whose adoption, in
turn, triggers certain categories of actions, such as the creation of a
[subnet](#subnet "wikilink"), the addition of a
[nodes](#node "wikilink") to a subnet, and the modification of the
[ICP](#ICP "wikilink") exchange rate.

##### proto-node

A **proto-node** is an [IC](#Internet_Computer_(IC) "wikilink") entity
consisting of a combination of hardware and software, that differs from
a [node](#node "wikilink") in that it has not yet been registered with
the IC. A proto-node is, in short, a "node-in-waiting," hence has all
that it takes to be a node except the [replica](#replica "wikilink")
software.

## Q

##### query

A **query** is an optimised way to execute operations on a
[canister](#canister "wikilink") where the state changes are not
preserved. Queries are synchronous and can be made to any
[node](#node "wikilink") that hosts the canister. Queries do not require
[consensus](#consensus "wikilink") to verify the result.

## R

##### replica

The **replica** is a collection of protocol components that are
necessary for a [node](#node "wikilink") to participate in a
[subnet](#subnet "wikilink").

##### registry

The IC **registry** manages the system meta-data maintained on the
network nervous system ([NNS](#network_nervous_system_(NNS) "wikilink"))
and accessed by all [subnet](#subnet "wikilink") blockchains.

## S

##### smart contract

A **smart contract** is a stateful computer program designed to
automatically execute, control or document relevant events and actions
according to the terms of a contract or an agreement. A smart contract
can be deployed on the [Internet
Computer](#Internet_Computer "wikilink") in the form of a
[canister](#canister "wikilink") bundling data and code.

A canister can have one or more [controllers](#controller "wikilink")
that are permitted to modify the code of the canister, thereby modifying
the terms of the smart contract. For a canister smart contract to have
immutable code, its list of controllers must be empty.

##### state change

A **state change** is the result of any
[transaction](#transaction "wikilink"), function call, or operation that
changes the information stored in a [canister](#canister "wikilink").
For example, if a function makes an update call that adds two numbers
together or removes a name from a list, the result is a change to the
canister state.

##### state manager

The **state manager** is responsible for

1.  maintaining (multiple versions of) the replicated state the
    deterministic state machine implemented by [message
    routing](#message_routing "wikilink") and the [execution
    environment](#execution_environment "wikilink") operates on,
2.  converting back and forth between the replicated state and its
    canonical version (latter can be understood independent of the
    concrete implementation),
3.  obtaining certifications of parts of the canonical state, which
    allow other stakeholders such as other [subnets](#subnet "wikilink")
    and/or users, to verify that some piece of state indeed originates
    from a valid subnetwork, and
4.  providing capabilities to sync the canonical state with other
    [replicas](#replica "wikilink") in the same subnet so that replicas
    that have fallen behind can catch up.

##### subnet

A **subnet** (subnetwork) is a collection of [nodes](#node "wikilink")
that run their own instance of the [consensus](#consensus "wikilink")
algorithm to produce a subnet blockchain that interacts with other
subnets of the [IC](#Internet_Computer_(IC) "wikilink") using [chain
key](#chain_key "wikilink") cryptography.

##### system canister

A **system canister** is a pre-installed
[canister](#canister "wikilink") that performs certain tasks needed to
maintain the [Internet Computer](#Internet_Computer "wikilink").

## T

##### transaction

A ledger account **transaction** is the process of transferring
[ICP](#ICP "wikilink") from one [account](#account "wikilink") to
another; it can be of three types: (a) regular transfer transaction, (b)
[burning](#burning "wikilink") transaction, and (c)
[minting](#minting "wikilink") transaction.

##### transfer transaction

A **transfer transaction** is the process of transferring ICP from any
regular ledger [account](#account "wikilink") (i.e. any ledger account
except the [ ICP supply account](#ICP_supply_account "wikilink")) to
another regular ledger account.

## U

##### user

A **user** is any entity that interacts with the [Internet
Computer](#Internet_Computer "wikilink"). Users include end-users that
use dapps deployed on the [IC](#Internet_Computer_(IC) "wikilink"), dapp
developers, holders of [ICP](#ICP "wikilink") utility tokens, and
[neuron](#neuron "wikilink") holders.

## V

##### valid set rule

The **valid set rule** is the rule that determines a valid [induction
pool](#induction_pool "wikilink"). [Ingress
messages](#ingress_message "wikilink") and [inter-canister
messages](#inter-canister_message "wikilink") must pass certain checks
to ensure that the valid set rule is upheld before they can be added to
the induction pool.

##### voting

**Voting** is the process through which
[proposals](#proposal "wikilink") are selected for adoption and
implementation. Its direct participants are the
[neurons](#neuron "wikilink"), who both (a) submit proposals and (b)
vote on proposals. The voting process is a rather intricate undertaking,
involving aspects such as neuron eligibility, voting power, chains of
neuron followees etc. This has been designed with security and
dependability in mind, and is being continuously improved in order to
prevent the concentration of voting power in the hands of just a few
neuron owners.

## W

##### WebAssembly

**WebAssembly** (abbreviated Wasm) is a binary instruction format for a
stack-based virtual machine.
