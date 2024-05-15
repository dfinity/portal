---
keywords: [intermediate, rosetta, tutorial]
---

import { MarkdownChipRow } from "/src/components/Chip/MarkdownChipRow";

# Construction-API implementation
This section will give you an overview of how you can make transactions via Rosetta using the Construction-API
## Supported transactions
The Construction-API allows for offline signing of transactions and then posting them on the IC at a later point in time. It is recommended to first go through [flow of operations](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/index.mdx) of the Construction-API to gain an understanding of how it works, what endpoints to call with what parameters and where the user has to take action upon receiving certain responses. 

In general the Construction-API of Rosetta supports three categories of transaction types:
- [Transfering assets](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/index.mdx): This is the most basic functionality. In accordance with the ICRC-1 standard you can use Rosetta to transfer ICP. 
- [Staking & Neuron Management](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/staking/index.mdx): To be able to stake your ICP and earn rewards for taking part in the voting mechanism of the NNS you will need to create a neuron and configure it so it fits your personal preferences.
- [Voting & Following](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/voting/index.mdx): To gain rewards in the form of maturity you will need to take part in the voting on the NNS or follow existing neurons.