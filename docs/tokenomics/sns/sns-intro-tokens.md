# Service Nervous System

A Decentralized Autonomous Organization, or DAO for short, is a system that allows
many parties to jointly control an entity.
Similarly to how the Network Nervous System (NNS) is the open tokenized DAO that controls
the Internet Computer blockchain (IC), service nervous systems 
(SNSs) are algorithmic DAOs that allow developers to hand over their dapps to decentralized, 
token-based governance systems.
This means, each dapp that would like to be under decentralized control will have a 
separate SNS.

## What is a DAO?
DAO stands for _Decentralized Autonomous Organization_.

Let's first clarify what we mean by _decentralized_ in this
context.
First, an application can run on a _decentralized platform_. This means that
the platform itself is controlled by many different parties and, in particular,
that even if some of these parties fail or turn malicious, the application
will still keep running successfully. The IC is such a platform as it is
run by many nodes that are owned by independent node providers. Therefore,
we call applications that run on the IC
_decentralized applications_ or _dapps_.

A further kind of decentralization revolves around the *governance* of a dapp, i.e. who is in control of changing a dapp,
or a smart contract more generally.
In general, dapps running on the IC or smart contracts on other
decentralized platforms can still be controlled by a single, central entity
and thus still be under centralized control. 
As we will motivate below, it is often beneficial if a dapp is also under
_decentralized control_. This means that no single party can decide how the 
dapp is evolved. Instead, the dapp can only be changed according to decisions
that many parties jointly make. 
This decentralized control of a dapp is what a DAO achieves.

## Motivation: why a DAO? 
We next discuss the main motivations for DAOs from the point of view of two
main actors on the IC: the dapp developers, who build dapps on the IC, and
the end-users, who interact with and invest in dapps.

### Dapp users
Dapps on the IC are realized as a set of canister smart contracts.
Canisters define a _controller_ specifying which principals can
modify them.
Most dapp canisters are either controlled by some developers or
have no controller at all.
Both situations are undesirable for a dapp's users.
In the case where a dapp is controlled by a centralized group of developers,
users of the dapp must trust these developers not to stop the application and
not to modify the application in an undesirable way, e.g., that favors the 
developers.
In the case where the canister has no controller, it cannot be upgraded at
all. This not only prevents evolving the dapp regarding new requirements but
might also be a problem when it is necessary to fix security bugs.

DAOs provide a third option, namely to hand over the control over a dapp
to a community that can jointly decide how to evolve a dapp in an open 
governance system, i.e., to _decentralize a dapp's control_. This protects
users as the control is now in the
hand of a community rather than in the hand of a few parties. Moreover, 
dapp users can join the open governance themselves and thereby directly
impact how the dapp is evolved.

### Dapp developers
Decentralizing a dapp's control is not only an advantage for the dapp's users
but can also be an advantage for the dapp's developers. After all, it is in the
developer's interest to build the features users want.

Apart from this, another motivation for dapp developers to adopt
a DAO such as the SNS is that it allows to _tokenize the dapp_ which can
help to get _initial funding_ and _initial adoption_.

For a dapp that has an assigned SNS, anyone can purchase
SNS tokens and participate in SNS governance.
Thereby, anyone in the world can contribute to the funding of the project.
This is fundamental for developers as this allows the SNS to decide to
spend some of these funds, for example to pay for the dapp’s cycles or to
pay developers.

The SNS can also decide to use different [tokenomics](./tokenomics.md) models to create new
incentive systems.
For example, the SNS can decide to introduce voting rewards to motivate active
governance participation.
Moreover, rewards can be given to early adopters of the
dapp and active users, which will help attract users.
Furthermore, those who then possess SNS tokens are motivated to help
increase the value of the tokens by attracting even more users. Therefore,
such incentive systems can have positive network effects that are critical
for the success of some dapps.

### Dapp investors
Apart from active dapp users and dapp developers a third user group are
those who would like to invest in a dapp.
As already mentioned above, investors too profit both from the tokenization
and decentralization that a DAO such as the SNS can provide.
First, tokenization allows investors to get SNS tokens and invest in a dapp.
The fact that tokens can then be staked and then be used for governance
participation ensures that investors can contribute to the decisions
on how the dapp will be evolved.
[Voting rewards](./rewards.md) might further incentivize investors to participate in governance. 
Finally, the positive network effects that tokenomics can have are of course
also in the interest of the investors whose tokens have an increased value if
the project is successful.

## DAO to build Web3
One of the main motivations for building on blockchain or decentralized platforms is to remove a central point of trust. Over the past decade we've seen a number of important steps forward towards the open internet. We've seen native tokens built into blockchains, solving a decades old payments problem (at least technically). With the advent of smart contracts, we've seen the decentralization of code execution, giving further integrity to the computation we perform. Yet while these innovations have given us some liberation, DAOs are the final tool needed to build Web3 applications. Having decentralizing communication, computation, and now ownership and governance gives a strong foundation for open and tokenized applications. 
