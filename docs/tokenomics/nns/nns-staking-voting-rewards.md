# Staking & Voting Rewards on the NNS

Stakeholders gain voting power and can earn voting rewards by staking their ICP tokens. 

The Internet Computer is a decentralized platform whose evolution is decided by its stakeholders through voting. This means decision impacting the future of the Internet Computer are made by people vested in the outcome. In return for participation in governance, the Internet Computer gives out voting rewards. Voters can vote actively, or they can use the liquid democracy on the Internet Computer to automatically follow other voters.

## Key Concepts

### Neurons

In order to become vested and obtain voting power, ICP tokens must first
be staked, and then locked up for a length of time greater than 6
months to, at most, 8 years.

Just as tokens are held in a user's account, stake is held in a special
account called a "neuron". Each neuron has its own identifier, and
several attributes relating to its stake. These include:

* the length of time it is locked for (the "dissolve delay");
* whether it is currently dissolving;
* and how much reward it has accrued as a result of voting on proposals (the "maturity").

Once a neuron is locked for more than six months, it gains the ability
both to submit proposals and to vote on them. Voting in turn generates
voting rewards, based on how active a neuron is in voting on proposals.
If you vote on every open proposal, you gain the maximum reward.

A neuron can also "follow" other neurons, which causes it to
automatically vote the same as the majority of the neurons that it
follows. 

### Voting Power

The voting power of a locked neuron is determined by several factors:

* Principally, by its stake. 1 ICP = the power of 1 vote.
* Next, by its lock up duration, or dissolve delay. 6 months grants a 1.06x voting power bonus, and 8 years grants 2x. All other durations scale linearly between.
* Lastly, by its age, or length of time spent locked up without dissolving. 4 years grants a 1.25x bonus, multiplicative with any other bonuses. All other durations between 0 seconds and 4 years scale linearly between.

This means that the maximum voting power, of 2.5 votes per ICP staked,
is only achievable by locking up your neuron for 8 years, and leaving it
in that locked up state for 4 years. At that time you will have the most
voting power for the stake committed.

### Maturity

Maturity represents the voting rewards accumulated in a neuron. Each day
the network rewards participants by allocating to every voting neuron a
portion of the total reward, based both on its voting power at the time
proposals were made, and the number of proposals it voted on.

Please note that different tax authorities may take different views on the taxation status of the voting rewards. Neuron owners who receive voting rewards and convert them to ICP should consult appropriate professionals.

For those who wish to compound the voting power in their neuron, the most
natural activity is to "stake maturity" on a regular basis. If you wish to liquidate rewards you earn from the
neuron and convert them to ICP, you can "spawn" maturity into a reward neuron.

## Why Staking Matters

Staking is a way of allowing those who support the Internet Computer to
decide what happens next with the platform.

When the Internet Computer first launched, all proposals required a
majority vote to pass. Gradually, however, this is changing. After an
update it is now possible for proposals to pass with only a
majority among 3% of the total voting power, meaning that proposals
stand a chance even if large entities abstain and the majority of the
network does not vote.

## Voting Rewards

Voting rewards are an important aspect of neurons and can be compounded to increase your total voting power. So
to better understand staking and reward, it may be helpful to look at
staking from two perspectives:

### Short-term: voting rewards each day

Every day, rewards are granted by the network to each voting neuron. The
percentage of those rewards received by each neuron depend on the
following factors:

* Amount of ICP and maturity staked
* Length of dissolve delay
* "Age" of the neuron (time spent in a non-dissolving state)
* Number of eligible proposals the neuron has voted on

For example, if on a single day the NNS has generated 1000 maturity in total
rewards (see below for more on how this is computed), and there were 10
proposals submitted which only two neurons voted on, and:

* Neuron A has a voting power of 20, and voted on all 10 proposals
* Neuron B has a voting power of 80, and voted on all 10 proposals

Then the 1000 maturity would be divided between these two neurons by their
proportional voting power:

* Neuron A with voting power of 20, gets 20% of the total = 200 maturity
* Neuron B with voting power of 80, gets 80% of the total = 800 maturity

If either neuron had only voted for X% of those 10 proposals, it's
reward would be decreased to X% of its maximum eligibility, with the
remainder distributed among the other neurons.

### Long-term: voting rewards over years

The voting reward function is depicted in this curve: https://dashboard.internetcomputer.org/circulation

In the first year, the NNS allocates 10% of the total supply to generate
voting rewards. Note the term "allocates" rather than "mints", because
rewards are not minted until they are spawned and the according reward neuron is
disbursed. This allocation rate drops quadratically until it reaches 5% by year 8 after genesis. 

Like all parameters in the NNS, the minting rate can be changed via
NNS proposals, but this is the current rate schedule.

Because the total supply of ICP is a dynamic system with deflation and
inflation, it is impossible to predict what voting rewards will be on any
given day or year in the future. It is relatively easy to predict what
the percentage allocation rate will be months from now, but it is much
harder to predict what the total supply will be both because of
potential changes to the rate, and how often stakeholders will spawn
their maturity.

### Inflationary and Deflationary Mechanisms

Deflationary mechanisms:

* Minting cycles to pay for compute and storage burns ICP to create cycles
* Burning of transaction fees
* Burning of the fee for failed proposals of neurons; note that this only happens at disbursement or merging of neurons, so accumulated fees can persist for a while before finally contributing to deflation.

Inflationary mechanisms:

* Node providers are paid by minting ICP.
* Voting rewards, once spawned and converted to ICP.
