# Deploying & Upgrading Canisters

## Mechanics of a Deployment



## Things to consider

  * [Funding](#funding)
  * [Demonstrating Trust](#demonstrating-trust)

### Funding

Internet Computer Canisters are funded using a balance of cycles that will gradually burn down over time. You will be paying for the amount of memory you have allocated, as well as the CPU time that queries and updates take up.

Here is a checklist of the things you will need to consider:

- [ ] What will the canister's source of funds be?
  * Paid for up-front by the developer
  * Funded by donations from the community
  * Funded by ongoing revenue in ICP or cycles
- [ ] How will I monitor the canister's balance?
- [ ] What is your plan in case the balance runs low?
- [ ] What will happen if the balance runs out and the canister is eventually erased?

Depending on your use case, different answers will make sense for your application. Unlike other blockchains, where you assume that all content added is available forever, the Internet Computer requires you to think about the costs and sustainability of the computing resources that you are using.

An NFT project or DeFi canister may be able to self-fund by using transaction fees to purchase their own cycles. For other use cases, you may want a company or DAO to be responsible for supervising the balance. In any case, it is worthwhile to think about how you plan to ensure your canister's longevity.
