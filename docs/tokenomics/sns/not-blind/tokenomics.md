# Tokenomics of a DAO
## Background and key concepts
### What is tokenomics?
A token is a digital asset on a blockchain. Tokenomics describes the economics of a token system on a blockchain. It is a game changer for Decentralized autonomous organization (DAOs) compared to traditional apps running on a web 2.0 infrastructure, because it enables the introduction of new incentive systems and use cases. Tokenizing a DAO allows, for instance, that anyone in the world can purchase tokens and thereby contribute to initial funding for the DAO. Moreover, tokens can be paid to early adopters and active users, which will help attract users.

Tokenomics covers a wide range of topics, such as 
* Development of token supply & demand over time. This includes creating new tokens (minting) and destroying tokens (burning).
* How tokens are used
* Allocation of tokens to participants of the DAO
* Incentive mechanisms, e.g., providing tokens to early adopters.   

### Supply & demand
We define the supply of a token as the amount which token holders are willing to sell at a given price. Likewise, token demand is the amount of tokens, token buyers are willing to buy for a given price. The following graph depicts the typical relationship between the supply & demand and price for an example good, which in our case could be a token priced in USD. 


(Image source: epthinktank.eu)

Typically supply increases with increasing prices. For example, if the price of Bitcoin increases, typically more Bitcoin holders will be willing to sell at the higher price on the market. On the other hand, demand typically decreases with increasing prices. The intersection of the two curves determines the so-called equilibrium price, called P<sub>2</sub> in the picture.

How do we end up at the equilibrium price ?
* If P<sub>1</sub> > P<sub>2</sub>: We have a surplus, i.e., more supply than demand. This creates downward pressure on the price. 
* If P<sub>3</sub> < P<sub>2</sub>: We have a shortage, i.e., More demand than supply. This creates upward pressure on the price. 
### Token emission over time
A token emission schedule defines the rate at which new tokens are minted over time. The design of a token emission schedule is crucial for the success of a DAO. 

On the one hand, token emissions generate _liquidity_ of tokens. It should be ensured that sufficient amounts of tokens are available from the start so that people can participate in activities on the DAO. 

On the other hand, token emissions contribute to the token supply and hence influence the token price. Therefore, limiting the token emission schedule can have a positive impact on the token price. 

As a consequence, emission schedules are typically designed as follows: Initially, high amounts of tokens are issued to kick start the token economy and to incentivize early participation. Over time, the marginal increase of the token supply goes down to limit the impact on the token price and to create scarcity, i.e., limited availability.    

### Token use cases
Tokens can cover many different (potentially overlapping) use cases. For example 
* **Governance**: Those tokens give holders the right to vote on proposed changes of a DAO. 
To incentivise long-term thinking and commitment, systems often require staking of tokens. Staking means that token holders lock up a portion of tokens for a period of time. In exchange, stakers can earn rewards.

* **Currency**: Form of digital money with usage as medium of exchange, unit of account, store of value. 
* **Operations**: Facilitate operations on the blockchain. For example paying fees to store information and execute transactions.
* **Decentralized Finance (DeFi)**: Financial functions (e.g. lending, saving, trading) on a blockchain. 
DeFi tokens incentivise users to facilitate these functions, e.g. providing liquidity.
* **Social Finance (SoFi)**: Tokens underpinning social networks. This includes tokenization of popularity & reputation. For example participants could receive tokens if they have a lot of followers or views.


## Tokenomics aspects to consider when establishing a DAO
When establishing a DAO you might want to consider (at least) the following aspects: 
### Token utility
Define concisely for which use cases the token (or several tokens) of the DAO will be used (see prior section on use cases).  In particular it should be considered how the token(s) could be used for 
* Participation in governance
* Rewarding active participation in services offered by the DAO 
* Rewarding contributions to the growth of the DAO
### Initial token allocation
For the initial token allocation, i.e., defining which groups/accounts should receive how many tokens, you could consider the following main blocks

* **DAO treasury**: These are tokens which are at the disposition of the DAO. They can be used according to predefined rules defined in the protocol of the DAO or distributed ad-hoc subject to voting. For example, they might be used for community bounties & user rewards.
* **Decentralization sale**: Distribution to the community via an initial or subsequent decentralization sale. 
* **Seed funders**: Distribution to funders (if you choose to have them) who invested in the project prior to the launch of the DAO.  
* **Funding development team**: Developers who created the initial version of the DAO. 

To emphasize the decentralization of the DAO from the start, developers can send a strong signal by 
* allocating a significant part of the tokens to the DAO treasury, allowing the treasury to incentivize and reward users over time. 
* ensure that the amount of tokens allocated to the decentralization sale is bigger than the amount allocated to seed funders and the funding development team.  

### Voting power and decentralization
The voting power should be distributed over many, independent entities such that there is not one single or a few entities that can decide by themselves how the DAO evolves.

As mentioned above, participation in governance typically requires the staking of tokens for a certain amount of time. To incentivise long-term thinking and commitment, DAOs can provide more voting power to those token holders who stake for a longer time period. On this page (TODO link) there is more information on the configuration of voting rewards. 

The configuration of the voting power should consider the (initial) allocation of tokens, to ensure decentralization from the start. 
For example it should be ensured that the voting power of the funding dev team is below 50% of the total voting power. 


