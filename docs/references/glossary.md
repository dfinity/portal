# Glossary

## A

#### account

A ledger **account** is a set of entries in the [ ledger
canister](#ledger-canister), which is a smart contract that
mimics the guise and behavior of a regular banking account, whose unit
of measure is [ICP](#icp) (Internet Computer Protocol)
utility tokens. Ledger accounts are owned by [
principals](#principals), and their ownerships do not change
over time. Every account on the ledger has a positive [
balance](#balance) measured in ICP with a precision of eight
decimals.

#### address

In the context of [transactions](#transaction) on the ledger,
**address** is synonymous with [ account](#account).

#### actor

An **actor** is a primitive in the [actor
model](https://en.wikipedia.org/wiki/Actor-model). It is a process with
encapsulated state that communicates with other concurrently running
actors through asynchronous messages that are received sequentially. The
actor model is relevant to the [IC](#internet-computer-ic-ic)
because [canisters](#canister) on the IC (a type of smart
contract) follow the actor model for concurrent and asynchronous
computation.

## B

#### balance

The **balance** of an [account](#account) on the ledger is
the sum of all deposits minus the sum of all withdrawals. As a
degenerate case, it is sometimes useful to say that an account which is
not present in the ledger has a balance of zero.

The balance of a ledger account is denominated in ICP and is represented
with eight decimals. Thus, the minimum positive balance of an account is
0.00000001 or 10^-8 [ICP](#icp); this amount is sometimes
referred to as one **e8**.

#### batch

A **batch** is a collection of [messages](#messages) whose
order is agreed upon by [consensus](#consensus).

#### beneficiary

The **beneficiary** of an [account](#account) is the [
principal](#principal) who owns the [
balance](#balance) of the account. The beneficiary of an
account cannot be changed. The beneficiary of an account may or may not
be allowed to make [transactions](#transaction) on the
account (see [fiduciary](#fiduciary)).

#### blockchain

A **blockchain** is a growing list of cryptographically linked blocks,
agreed upon by [consensus](#consensus). On the [Internet
Computer](#internet-computer-ic) every [subnet](#subnet) is a blockchain and these blockchains
interact using [chain key cryptography](#chain-key).

#### boundary nodes

**Boundary nodes** are Nginx gateways to the Internet Computer. These nodes
act as HTTP routers through which the network’s
[subnet](#subnet) blockchain nodes can be reached. The
boundary nodes have several purposes: they aid in discover-ability (the
`icp0.io` domain name points to a set of boundary nodes), they are
geo-aware and can route incoming requests to the nearest subnet
[node](#node) that hosts the [canister](#canister)
involved, they can help load balance query
[transactions](#transaction), they can cache
cryptographically verified data in the role of a content distribution
network, they can throttle excessive interactions from an outside IP
address, bootstrapping/installing the service worker, and they can help
protect subnets from DDoS attacks.

#### burning transaction

A **burning transaction** is the process of "burning" [
ICP](#icp), whereby a certain amount of ICP are destroyed.
The main use case is that of purchasing [cycles](#cycles),
through which ICP are destroyed while at the same time a corresponding
amount of cycles is created, using the current exchange rate between ICP
and ([XDR](#XDR)), in such a way that one XDR corresponds to
one trillion (10E12) cycles. It is represented as a [
transaction](#transaction) from the source [
account](#account) to the [ ICP supply
account](#icp-supply-account).

## C

#### Candid

**Candid** is an IDL crafted specifically for the Internet Computer,
providing a common language for application interfaces to facilitate
communication between services that are written in different programming
languages.

#### canister

A **canister** is a type of smart contract that bundles **code** and
**state**. A canister can be deployed as a [smart
contract](#smart-contract) on the [Internet
Computer](#internet-computer-ic) and accessed over the Internet.

#### canister account

A **canister account** is a ledger account owned by a [
canister](#canister) (i.e. whose
[fiduciary](#fiduciary) is a canister). A non-canister
account is a ledger account whose fiduciary is a non-canister
[principal](#principal).

#### canister development kit (CDK)

A **canister development kit** is an adapter used by the IC SDK that provides a programming language with the features necessary to create and manage canisters. The IC SDK comes with a few CDKs already installed for you so you can use them in the language of your choice. 

#### canister identifier

The **canister identifier** or **canister ID** is a globally-unique
identifier that identifies a [ canister](#canister) and can
be used to interact with it.

#### canister signature

A **canister signature** uses a signature scheme based on [certified
variables](#certified-variables). Public “keys” include a
[canister id](#canister-identifier) plus a seed (so that
every [canister](#canister) has many public keys); signatures
are certificates that prove that the canister has put the signed message
at a specific place in its state tree. Details can be found in the [Internet Computer interface specification](/references/ic-interface-spec.md#canister-signatures).

#### canister state

A **canister state** is the entire state of a
[canister](#canister) at a given point in time. A canister’s
state is divided into **user state** and **system state**. The user state is
a [WebAssembly](#WebAssembly) module instance and the system
state is the auxiliary state maintained by the [Internet
Computer](#internet-computer-ic-ic) on behalf of the canister, such
as its compute allocation, balance of [cycles](#cycles),
input and output queues, and other metadata. A canister interacts with
its own system state either implicitly, such as when consuming cycles,
or through the System API, such as when sending messages.

#### catch-up package (CUP)

A **catch-up package** is a data bundle that contains everything needed
to bootstrap a [subnet](#subnet)
[replica](#replica).

#### certified query

A **certified query** is a query call for which the response is
certified.

#### certified variable

A piece of data that a [canister](#canister) can store in its
[subnet](#subnet)’s canonical state in the processing of an
update call (or inter-canister call), so that during the handling of a
[query](#query) call, the canister can return a certificate
to the user that proves that it really committed to that value.

#### chain key

**Chain key** cryptography consists of a set of cryptographic protocols
that orchestrate the [nodes](#node) that make up the
[Internet Computer](#internet-computer-ic). The most visible
innovation of chain key cryptography is that the Internet Computer has a
single public key. This is a huge advantage as it allows any device,
including smart watches and mobile phones, to verify the authenticity of
artifacts from the Internet Computer.

#### consensus

In distributed computing, **consensus** is a fault tolerant mechanism by
means of which a number of [nodes](#node) can reach agreement
about a value or state.

Consensus is a core component of the [replica](#replica)
software. The consensus layer selects [messages](#messages)
from the peer-to-peer artifact pool and pulls messages from the
cross-network streams of other [subnets](#subnet) and
organizes them into a [batch](#batch), which is delivered to
the [message routing](#message-routing) layer.

#### controller

A **controller** of a [canister](#canister) is a person,
organization, or other canister that has administrative rights over the
canister. Controllers are identified by their
[principals](#principal). For example, a controller of a
canister can upgrade the [WebAssembly](#WebAssembly) code of
the canister or delete the canister.

#### cycle

On the [Internet Computer](#internet-computer-ic), a **cycle**
is the unit of measurement for resources consumed in the form of
processing, memory, storage, and network bandwidth. Every canister has a
cycles account to which resources consumed by the canister are charged.
The Internet Computer’s utility token ([ICP](#icp)) can be
converted to cycles and transferred to a canister. Cycles can also be
transferred between canisters by attaching them to an **inter-canister**
message.

ICP can always be converted to cycles using the current price of ICP
measured in **XDR** using the convention that one trillion cycles
correspond to one **XDR**.

## D

#### dapp

A **dapp**, or decentralised application, is a
[canister](#canister) running on the [Internet
Computer](#internet-computer-ic).

#### data center

A **data center** (DC) is a physical site that hosts
[nodes](#node) which contribute to the [Internet
Computer](#internet-computer-ic). It includes the hardware and
software infrastructure required for node deployment. A DC is identified
on the Internet Computer by a unique identifier.

#### dissolve delay

The **dissolve delay** is the amount of time that
[neurons](#neuron) must spend [
dissolving](#dissolving-state) before becoming [dissolved](#dissolved-state).

#### dissolved state

The **dissolved state** is a [neuron](#neuron) state
characterized by a [dissolve delay](#dissolve-delay) equal to
zero. (It is conventionally said that a neuron in this state does not
"have" a dissolve delay.) It is in this state that a neuron can be
"disbursed," hence its stake moved elsewhere, and its corresponding
[neuron account](#neuron-account) closed. The
[age](#neuron-age) of a dissolved neuron is considered to be
zero.

#### dissolving state

A **dissolving state** is a [neuron](#neuron) state that
follows immediately after its owner issues a "start dissolving" command,
and continues until a "stop dissolving" command is issued, or until the
dissolve delay timer runs out. The [age of a dissolving neuron](#neuron-age) is considered to be zero.

## E

#### execution environment

The **execution environment** is one of the core layers of the
[replica](#replica) software.

## F

#### fiduciary

The **fiduciary** of an [account](#account) is the
[principal](#principal) allowed to make
[transactions](#transaction) on the account; as such, it may
be useful to think of it as the **owner** of the account, with the caveat
that it may or may not be the [beneficiary](#beneficiary) of
the account. The [neuron account](#neuron-account) is a
prominent example of an account for which the beneficiary and fiduciary
do not coincide (the fiduciary is the [governance canister](#governance-canister) while the beneficiary is the
neuron holder). The fiduciary of a (ledger) account does not change over
time.

The distinction between fiduciary and beneficiary is also important for
DeFi dapps (canisters) that interact with the IC ledger: in this case,
the fiduciary is the DeFi canister while the beneficiary is the
individual or organisation [principal](#principal) that uses the
DeFi canister’s services.

## G

#### governance canister

The **governance canister** is a [system canister](#system-canister) that implements the
[NNS](#network-nervous-system-(NNS)) governance system, i.e.,
among others, stores and manages [neurons](#neuron) and
[proposals](#proposal), and implements the NNS
[voting](#voting) environment.

## I

#### ICP

The **Internet Computer Protocol** token (ticker "ICP") is the utility
token of the [Internet Computer](#internet-computer-ic). ICP
allows the broader internet community to participate in the governance
of the Internet Computer blockchain network by locking ICP in
[neurons](#neuron). ICP can also be converted into
[cycles](#cycles), which are then used to power
[canisters](#canister).

#### ICP supply account

The **ICP supply account** is a quasi-fictitious ledger
[account](#account) whose balance is always zero. It has a
central role in [ICP](#icp) [burning](#burning)
and [minting](#minting) operations.

#### identity

An **identity** is a byte string that is used to identify an entity,
such as a [principal](#principal), that interacts with the
[Internet Computer](#internet-computer-ic). For users, the
identity is the SHA-224 hash of the DER-encoded public key of the user.
[The Internet Computer interface specification](/references/ic-interface-spec.md) has more
detail.

#### Internet Identity

**Internet Identity** is an anonymizing blockchain authentication system
running on the [Internet Computer](#internet-computer-ic).

#### induction pool

The **induction pool** of a [subnet](#subnet) blockchain is
the collection of all [input queues](#input-queue) of all
[canisters](#canister) residing on the subnet.

#### ingress message

An **ingress message** is a [message](#message) sent by an
end-user to a [canister](#canister) running on a
[subnet](#subnet) blockchain. The message is signed by the
secret key corresponding to the end-user’s
[identity](#identity) and sent to one of the
[replicas](#replica) that participate in the subnet.

#### ingress message history

The **ingress message history** records the current status of every
[ingress message](#ingress-message) processed by a
[replica](#replica) and keeps track of whether messages were
successfully included in the [induction
pool](#induction-pool) and the responses of executed
messages.

#### input queue

The **input queue** of a [canister](#canister) contains all
[messages](#message) bound for the canister. See also
[induction pool](#induction-pool). When the canister is
scheduled for execution, messages from its input queue will be executed.

#### inter-canister message

An **inter-canister message** is a [message](#message) sent
from one [canister](#canister) to another. Inter-canister
messages are different from user-initiated [ingress
messages](#ingress-message).

#### Internet Computer (IC)

The **Internet Computer** (IC) is a decentralized blockchain that
provides scalable compute capacity for running
[canisters](#canister) through independent [node
providers](#node-provider) running [nodes](#node)
in geographically distributed [data centers](#data-center).

## L

#### ledger canister

The **ledger canister** is a [system
canister](#system-canister) whose main role is to store
[accounts](#account) and their corresponding
[transactions](#transaction).

## M

#### message

A **message** is data sent from one [canister](#canister) to
another or from a user to a canister.

#### message routing

The **message routing** layer receives [batches](#batch) from
the [consensus](#consensus) layer and inducts them into the
[induction pool](#induction-pool). Message routing then
schedules a set of [canisters](#canister) to execute messages
from their [input queues](#input-queue).

After [messages](#message) have been executed, the message
routing layer takes any messages produced in the execution round from
the output queues and puts those messages into the outgoing streams to
be consumed by canisters on other [subnets](#subnet).

#### minting transaction

A **minting transaction** is the process of "minting"
[ICP](#icp), whereby a certain amount of ICP comes into
existence. ICP is minted in order to reward
[neurons](#neuron) for [voting](#voting), and
reward [node providers](#node-provider) for participating in
the [IC](#internet-computer-ic) by providing compute
capacity through the running of [nodes](#node). A minting
transaction is represented as a [transaction](#transaction)
from the [ICP supply account](#icp-supply-account) to a
destination [account](#account).

#### Motoko

**Motoko** is a programming language designed to directly support the
programming model of the [Internet
Computer](#internet-computer-ic), making it easier to
efficiently build applications and take advantage of some of the more
unusual features of this platform, including the actor model for smart
contracts and compilation to WebAssembly.

## N

#### non-dissolving state

A [neuron](#neuron) that is not
[dissolved](#dissolved-state) or [
dissolving](#dissolving-state) is said to be in a
**non-dissolving state** (or "aging"). Non-dissolving neurons thus
accrue "age", with the caveat that beginning to dissolve at any time
reduces this age back to zero. The dissolve delay parameter of a
non-dissolving (aka "aging") neuron cannot be zero, because such a
neuron would have to already be dissolved.

#### Network Nervous System (NNS)

The **Network Nervous System** (NNS) is a collection of [system
canisters](#system-canister) (aka "NNS canisters") assembled
into a system that governs all aspects of the [Internet
Computer](#internet-computer-ic).

#### neuron

A **neuron** is an [IC](#internet-computer-ic) entity that
can make [proposals](#proposal) and vote on proposals related
to the governance of the [Internet
Computer](#internet-computer-ic) platform.

To provide the stability required for responsible governance, neurons
need to store ("stake") a certain amount of [ICP](#icp) in
order to be able to make and vote on proposals. This
[locks](#non-dissolving-state) the tokens for a period of
time, after which it starts [dissolving](#dissolving-state).
The ICP stake of a neuron is stored in a [neuron
account](#neuron-account). The neuron owner has the right to
propose and vote on governance issues, and is granted rewards for
[voting](#voting) in proportion to the amount of ICP staked,
and the duration of the [dissolve
period](#non-dissolving-state).

#### neuron account

A **neuron account** is a [canister
account](#canister-account) whose
[beneficiary](#beneficiary) is a [neuron](#neuron)
(or the neuron’s owner). The [governance
canister](#governance-canister) is the
[fiduciary](#fiduciary) of all neuron accounts.

#### neuron age

The **neuron age** is a [neuron](#neuron) parameter roughly
indicative of the time that has passed since its creation or since when
it last entered into a [non-dissolving
state](#non-dissolving-state). Calculation of a neuron’s age
needs to take into account whether the neuron has spent time [dissolving](#dissolving-state) or
[dissolved](#dissolved-state), both of which reset this
parameter.

#### node

A **node** is a physical or virtual network endpoint that hosts all the
hardware, [replica](#replica) software, and configuration
settings required to participate in the [Internet
Computer](#internet-computer-ic).

#### node operator

A **node operator** (NO) is a non-canister
[principal](#principal) who has the authority to add/remove
[nodes](#node) to/from the
[IC](#internet-computer-ic-ic).

[Node providers](#node-provider) come in possession of
Hardware Security Modules (HSM), and register the HSMs with the
[NNS](#network-nervous-system-(NNS)). (The HSM registration
process consists essentially in deriving an IC principal ID from the key
stored on the HSM, and persisting that ID with the NNS.) NPs hand
registered HSMs over to legal persons, who now gain the authority to
physically “operate nodes” (aka install
[replicas](#replica)). The caveat is that, as opposed to
"regular" principals, where a great deal of care goes into making sure
that one principal ID corresponds to only one person, HSMs can routinely
exchange hands, hence many persons can act as the same NO principal at
different times.

#### node provider

A **node provider** (NP) is a non-canister
[principal](#principal) that receives the rewards stemming
from node participation to the [IC](#internet-computer-ic)
(aka “payout principal”). Usually, though not necessarily, a node
provider is the owner of the [node](#node), and may also be
involved in node operation and related tasks. A node provider may
receive rewards from multiple nodes in multiple [data
centers](#data-center).

## O

#### output queue

Each [canister](#canister) has an **output queue** of
[messages](#message) bound for other canisters.

## P

#### peer-to-peer (P2P)

In common usage, **peer-to-peer** (P2P) computing or networking is a
distributed application architecture that partitions workload across a
network of equally-privileged computer [nodes](#node) so that
participants can contribute resources such as processing power, disk
storage, or network bandwidth to handle application workload.

The **peer-to-peer layer** collects and disseminates
[messages](#message) and artifacts from users and from other
nodes.

The [nodes](#node) of a [subnet](#subnet) form a
dedicated peer-to-peer broadcast network that facilitates the secure
**bounded-time/eventual delivery** broadcast of artifacts (such as
[ingress messages](#ingress-message), control messages and
their signature shares). The [consensus](#consensus) layer
builds upon this functionality.

#### principal

A **principal** is an entity that can be authenticated by the [Internet
Computer](#internet-computer-ic). This is the same sense of the
word principal as the [Wikipedia
definition](https://en.wikipedia.org/wiki/Principal-(computer-security)).
Principals that interact with the Internet Computer do so using a
certain [identity](#identity).

#### proposal

A **proposal** is a statement describing an action to modify certain
parameters of the [IC](#internet-computer-ic), or of any of
its subsystems. It is implemented as an IC entity having various
attributes, such as an ID, a URL, a summary etc. Proposals are submitted
by eligible [neuron](#neuron) owners for the consideration of
the IC community, and undergo a [voting](#voting) process,
following which they can be adopted or rejected. Adopted proposals are
then executed. There are several taxonomies of proposals, the most
prominent of which groups proposals into "topics," whose adoption, in
turn, triggers certain categories of actions, such as the creation of a
[subnet](#subnet), the addition of a
[nodes](#node) to a subnet, and the modification of the
[ICP](#icp) exchange rate.

#### proto-node

A **proto-node** is an [IC](#internet-computer-ic) entity
consisting of a combination of hardware and software, that differs from
a [node](#node) in that it has not yet been registered with
the IC. A proto-node is, in short, a "node-in-waiting," hence has all
that it takes to be a node except the [replica](#replica)
software.

## Q

#### query

A **query** is an optimised way to execute operations on a
[canister](#canister) where the state changes are not
preserved. Queries are synchronous and can be made to any
[node](#node) that hosts the canister. Queries do not require
[consensus](#consensus) to verify the result.

## R

#### replica

The **replica** is a collection of protocol components that are
necessary for a [node](#node) to participate in a
[subnet](#subnet).

#### registry

The IC **registry** manages the system meta-data maintained on the
network nervous system ([NNS](#network-nervous-system-(NNS)))
and accessed by all [subnet](#subnet) blockchains.

## S

#### smart contract

A **smart contract** is a stateful computer program designed to
automatically execute, control or document relevant events and actions
according to the terms of a contract or an agreement. A smart contract
can be deployed on the [Internet
Computer](#internet-computer-ic) in the form of a
[canister](#canister) bundling data and code.

A canister can have one or more [controllers](#controller)
that are permitted to modify the code of the canister, thereby modifying
the terms of the smart contract. For a canister smart contract to have
immutable code, its list of controllers must be empty.

#### state change

A **state change** is the result of any
[transaction](#transaction), function call, or operation that
changes the information stored in a [canister](#canister).
For example, if a function makes an update call that adds two numbers
together or removes a name from a list, the result is a change to the
canister state.

#### state manager

The **state manager** is responsible for:

- Maintaining (multiple versions of) the replicated state the
    deterministic state machine implemented by [message
    routing](#message-routing) and the [execution
    environment](#execution-environment) operates on.
- Converting back and forth between the replicated state and its
    canonical version (latter can be understood independent of the
    concrete implementation).
- Obtaining certifications of parts of the canonical state, which
    allow other stakeholders such as other [subnets](#subnet)
    and/or users, to verify that some piece of state indeed originates
    from a valid subnetwork.
- Providing capabilities to sync the canonical state with other
    [replicas](#replica) in the same subnet so that replicas
    that have fallen behind can catch up.

#### subnet

A **subnet** (subnetwork) is a collection of [nodes](#node)
that run their own instance of the [consensus](#consensus)
algorithm to produce a subnet blockchain that interacts with other
subnets of the [IC](#internet-computer-ic) using [chain
key](#chain-key) cryptography.

#### system canister

A **system canister** is a pre-installed
[canister](#canister) that performs certain tasks needed to
maintain the [Internet Computer](#internet-computer-ic).

## T

#### transaction

A ledger account **transaction** is the process of transferring
[ICP](#icp) from one [account](#account) to
another; it can be of three types: 
- Regular transfer transaction.
- [Burning](#burning) transaction
- [Minting](#minting) transaction.

#### transfer transaction

A **transfer transaction** is the process of transferring ICP from any
regular ledger [account](#account) (i.e. any ledger account
except the [ICP supply account](#icp-supply-account)) to
another regular ledger account.

## U

#### user

A **user** is any entity that interacts with the [Internet
Computer](#internet-computer-ic). Users include end-users that
use dapps deployed on the [IC](#internet-computer-ic), dapp
developers, holders of [ICP](#icp) utility tokens, and
[neuron](#neuron) holders.

## V

#### valid set rule

The **valid set rule** is the rule that determines a valid [induction
pool](#induction-pool). [Ingress
messages](#ingress-message) and [inter-canister
messages](#inter-canister-message) must pass certain checks
to ensure that the valid set rule is upheld before they can be added to
the induction pool.

#### voting

**Voting** is the process through which
[proposals](#proposal) are selected for adoption and
implementation. Its direct participants are the
[neurons](#neuron), who both:
-  Submit proposals.
-  Vote on proposals. 
The voting process is a rather intricate undertaking,
involving aspects such as neuron eligibility, voting power, chains of
neuron followees etc. This has been designed with security and
dependability in mind, and is being continuously improved in order to
prevent the concentration of voting power in the hands of just a few
neuron owners.

## W

#### WebAssembly

**WebAssembly** (abbreviated Wasm) is a binary instruction format for a
stack-based virtual machine.

## X

#### XDR

**XDR** is the currency code for *special drawing rights (SDR)*. SDRs are supplementary foreign exchange assets that are defined and maintained by the International Monetary Fund (IMF). SDRs are not a currency themselves, but represent a claim to a currenty that is held by IMF member countries in which they may be exchanged. The IC developer docs refer to currencies based on their currency codes, therefore SDRs are referenced as its currency code **XDR** in this documentation. 
