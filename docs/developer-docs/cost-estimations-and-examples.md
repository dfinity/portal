# Cost estimations and examples

### Cost estimation and examples
Briefly explain the generic parameters that are used for estimating cycle usage. Group them as per the “transaction groups” above: Messaging, Execution, Storage, Special features.
Explain how you compute an amount of cycles based on the input parameters. Now, they seem to be falling from the sky.
Introduce the example projects. What are their cost drivers? What are important considerations?
I would not show the endless list of parameters for every project but rather add a table summarizing transaction costs vs. example projects with the total cost per project and year. Now, no total is provided. It would be nice if we could keep the Storage / Execution / Messaging / Outcalls sub-sections in the table.
(subsection) Local development and instruction count
In the table we talk about local development but actually there is no cycle cost there, isn’t it? Let’s explain that. We should also point to tools and best practices for counting instructions and optimizing cost.

Considerations:
Where does the resource reservation mechanism fit it? Under storage transactions?
As a developer, I would expect a pointer to instructions for topping up canisters, monitoring cycle usage, etc. I don’t think this is content for the page we are discussing here but at least we should point to such related information.




## Units and fiat value
Key message: 1 T cycles cost 1 XDR

| Abbr.  | Name      | In numbers   | Cycles XDR value  | Cycles USD value  |
|---------------------------------------------------------------------------|
| T      | Trillion  | 1_000_000_000_000 | 1            | 1.34              |
| B      | Billion   | 1_000_000_000     | 0.001        | 0.00134           |
| M      | Million   | 1_000_000         | 0.000001     | 0.00000134        |
| k      | Thousand  | 1_000             | 0.000000001  | 0.00000000134     |
| –      | (one)     | 1                 | 0.000000000001 | 0.00000000000134|



## Overview: Estimated cost of sample project architectures

To get a rough estimate of how much your project may cost, below are a few common project architectures and their estimated monthly cost in cycles. For detailed breakdowns of each cycles cost, please refer to the chart below in [Details: Cost of compute and storage transactions on the Internet Computer](#details-cost-of-compute-and-storage-transactions-on-the-internet-computer).

:::info
The estimates below are simply for demonstrating what different sample architectures may cost. The actual cost of your project will vary based on the exact number of resources and canister calls that are used. Therefore, the estimates below should only be used for gaining an idea of what a project may cost, but should not be used for budgeting exact costs. For exact costs, you can calculate using the chart below for more details: [Details: Cost of compute and storage transactions on the Internet Computer](#details-cost-of-compute-and-storage-transactions-on-the-internet-computer).
:::

:::info
These estimates use a 13-node subnet. Costs will be different if deployed on a 34-node subnet. Please refer to the chart below for more details: [Details: Cost of compute and storage transactions on the Internet Computer](#details-cost-of-compute-and-storage-transactions-on-the-internet-computer).
:::

### Single canister

Consider a single canister that provides a service or function that is used by very few users called by other canisters through inter-canister calls with the following metrics:

- Nodes in the subnet the canister is deployed to: 13
- Amount of users: 5
- Daily active users: 5
- Daily messages per active user: 100
- Request and response bytes per message: 351
- Instructions executed per message: 778713
- Calls per message: 1
- Request and response bytes per call: 300
- Instructions per call: 10000
- Daily tasks: 10000
- Instructions executed per task: 10000000
- Daily HTTP outcalls: 0
- Request bytes per HTTP outcall: 0
- Response bytes per HTTP outcall: 0
- Storage bytes per user: 100000
- User-independent storage bytes: 5000000000

The estimated cost monthly in USD for a project with these metrics would be:

- Storage	$2.05 USD (= 1.53e+12 cycles).
- Execution	$1.88 USD (= 1.40e+12 cycles).
- Messaging	$0.03 USD (= 1.90e+10 cycles).
- HTTP outcalls	$0 USD (= 0.00e+0 cycles).


### Simple static website using a frontend canister

Consider a simple static website that uses a single frontend canister for the website's assets, that is not called by other canisters or performs HTTPS outcalls, with the following metrics: 

- Number of nodes in the subnet the canister is deployed to: 13
- Number of all users: 100
- Number of daily active users: 10
- Number of daily messages per active user: 50
- Number of request and response bytes per message: 350
- Number of instructions executed per message: 778713
- Number of calls per message: 0
- Number of request and response bytes per call: 0
- Number of instructions per call: 0
- Number of daily tasks: 100
- Number of instructions executed per task: 1000000
- Number of daily HTTP outcalls: 0
- Number of request bytes per HTTP outcall: 0
- Number of response bytes per HTTP outcall: 0
- Number of storage bytes per user: 0
- Number of user-independent storage bytes: 5000000000

The estimated cost monthly in USD for a project with these metrics would be:
- Storage	$2.05 USD (= 1.53e+12 cycles).
- Execution	$0.02 USD (= 1.65e+10 cycles).
- Messaging	$0.01 USD (= 1.06e+10 cycles).
- HTTP outcalls	$0 USD (= 0.00e+0 cycles).

:::caution
When considering developing a website on ICP, the estimated cost above might appear higher than the 'free tier' of a traditional Web2 service. However, there are several important benefits to consider that traditional Web2 web hosting services often hold behind additional paywalls, such as:

- Fees for multiple developers.

- Fees for access to workflows that use third-party services such as Github or Gitlab.

- Fees to enable advanced frontend functionality, like developing submittable forms, certain web assets, or streaming content.

- Fees to view site analysis.

- Fees to upload large media files. 

- Fees for advanced security functions or features.

On ICP, the fees broken down in this document are the only fees that are charged for developing. Developers only pay for exactly what is used by their project's canisters in terms of resources, and no features are restricted behind additional paywalls. Developers can integrate any aspect of ICP into their dapp (such as Internet Identity or chain-key cryptography) without being charged additional fees. Development teams can exist of any size, use any workflow they desire, and do not have to worry about fitting within certain resource limits to stay under a certain paid tier. 
:::

### Simple smart contract web dapp using a frontend canister and backend canister

Consider a simple smart contract powered web dapp that uses two canisters (a backend canister for the dapp's functionality and a frontend canister for the user interface) with the following metrics:

- Number of nodes in the subnet the canister is deployed to: 13
- Number of all users: 100
- Number of daily active users: 10
- Number of daily messages per active user: 1000
- Number of request and response bytes per message: 350
- Number of instructions executed per message: 778713
- Number of calls per message: 5
- Number of request and response bytes per call: 1000
- Number of instructions per call: 77000
- Number of daily tasks: 1000
- Number of instructions executed per task: 10000000
- Number of daily HTTP outcalls: 0
- Number of request bytes per HTTP outcall: 0
- Number of response bytes per HTTP outcall: 0
- Number of storage bytes per user: 100000
- Number of user-independent storage bytes: 10000000000

The estimated cost monthly in USD for a project with these metrics would be:
- Storage	$4.11 USD (= 3.07e+12 cycles).
- Execution	$1.79 USD (= 1.34e+12 cycles).
- Messaging	$1.21 USD (= 9.01e+11 cycles).
- HTTP outcalls	$0 USD (= 0.00e+0 cycles).

### Social media dapp with two canisters

Consider a project that creates a social media dapp using two canisters with around 200 monthly active user accounts that interact with the dapp monthly with the following metrics:

- Number of nodes in the subnet the canister is deployed to: 13
- Number of all users: 200
- Number of daily active users: 50
- Number of daily messages per active user: 6127
- Number of request and response bytes per message: 245
- Number of instructions executed per message: 1442185
- Number of calls per message: 5
- Number of request and response bytes per call: 1000
- Number of instructions per call: 7
- Number of daily tasks: 1000
- Number of instructions executed per task: 1000000
- Number of daily HTTP outcalls: 2000
- Number of request bytes per HTTP outcall: 250
- Number of response bytes per HTTP outcall: 250
- Number of storage bytes per user: 100000
- Number of user-independent storage bytes: 25000000000

The estimated cost monthly in USD for a project with these metrics would be:
- Storage	$10.28 USD (= 7.67e+12 cycles).
- Execution	$50.74 USD (= 3.79e+13 cycles).
- Messaging	$34.38 USD (= 2.57e+13 cycles).
- HTTP outcalls	$4.26 USD (= 3.18e+12 cycles).

### Decentralized service using threshold ECDSA and HTTPS outcalls

Consider a project that creates a decentralized service that makes several thousand HTTPS outcalls to services outside ICP with the following metrics:

- Number of nodes in the subnet the canister is deployed to: 13
- Number of all users: 5000
- Number of daily active users: 100
- Number of daily messages per active user: 4400
- Number of request and response bytes per message: 500
- Number of instructions executed per message: 437253
- Number of calls per message: 50
- Number of request and response bytes per call: 1000
- Number of instructions per call: 10000
- Number of daily tasks: 1000
- Number of instructions executed per task: 1000000
- Number of daily HTTP outcalls: 3691
- Number of request bytes per HTTP outcall: 332
- Number of response bytes per HTTP outcall: 332
- Number of storage bytes per user: 100000
- Number of user-independent storage bytes: 150000000000

The estimated cost monthly in USD for a project with these metrics would be:
- Storage	$61.83 USD (= 4.61e+13 cycles).
- Execution	$538.90 USD (= 4.02e+14 cycles).
- Messaging	$265.36 USD (= 1.98e+14 cycles).
- HTTP outcalls	$8.06 USD (= 6.01e+12 cycles).

::caution
This example resembles that of an enterprise-level project that expects the application will make about 1500 HTTPS outcalls per day. For reference, the [Orally](https://orally.network/) enterprise application on ICP averages between 35_000 and 46_000 HTTPS outcalls per month. 

An enterprise-level project of this size could potentially cost several thousands of dollars if deployed on a traditional Web2 platform. Web2 infrastructure services often charge additional fees that scale with the amount of requests that your project serves per day/per month. Traditional Web2 infrastructure services also frequently charge high fees for additional features or 'add-ons' into your application. Such fees do not exist on ICP; the fees listed in this document are the only fees associated with developing on ICP. Therefore, it is possible to run large, enterprise applications on ICP at a fraction of what the cost would be if deploying on a Web2 service.
:::

### Instant messaging dapp with thousands of canisters

Consider a project that creates a messaging dapp where each user's data is stored in its own canister, there are potentially thousands of canisters that each make thousands of inter-canister calls to facilitate messaging between two or more users with the following metrics:

- Number of nodes in the subnet: 13
- Number of all users: 15000
- Number of daily active users: 1500
- Number of daily messages per active user: 5700
- Number of request and response bytes per message: 624
- Number of instructions executed per message: 74983
- Number of calls per message: 1
- Number of request and response bytes per call: 300
- Number of instructions per call: 10000
- Number of daily tasks: 10000
- Number of instructions executed per task: 10000000
- Number of daily HTTP outcalls: 0
- Number of request bytes per HTTP outcall: 0
- Number of response bytes per HTTP outcall: 0
- Number of storage bytes per user: 10000000
- Number of user-independent storage bytes: 750000000000

The estimated cost monthly in USD for a project with these metrics would be:
- Storage	$369.73 USD (= 2.76e+14 cycles).
- Execution	$511.89 USD (= 3.82e+14 cycles).
- Messaging	$622.12 USD (= 4.64e+14 cycles).
- HTTP outcalls	$0 USD (= 0.00e+0 cycles).

:::caution
In this example, a new canister is created for each user. That means, each time a new user signs up for the dapp, a cost of 100_000_000_000 is charged. This additional cost should be considered if choosing an architecture similar to this, as it can become expensive quickly.
:::