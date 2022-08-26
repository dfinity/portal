# How to launch an SNS

We explain how to deploy an SNS that is provided as a 
system functionality by the IC.
As explained in the [introduction](../sns.md), there are also other 
ways to deploy and maintain a DAO. Many concepts explained here may be 
relevant for you even if you deploy another kind of DAO.

We introduce here the steps to go through to launch an SNS.
We only give an overview here and, for each of the steps, we 
link to a page that provides more details. 

### Step 1: Defining the goals (non-technical preparation)
The successful launch of an SNS does not only depend on technical
aspects. 
In fact, it is advisable that before taking any technical steps, 
you take some non-technical preparation steps and define what the SNS
that you are about to launch should achieve. 
To motivate this better, let's look at two examples of such non-technical
considerations in the following.

**Example 1.** 
To decentralize a dapp, the governance control has to be distributed 
among many parties. Therefore, a successful decentralization relies on
reaching many parties and convincing them to participate in the 
governance system. Achieving this may rely on non-technical strategies,
such as proper advertising and marketing.

**Example 2.**
The SNS implementation is very flexible and allows each SNS
community to set various parameters according to their needs.
Choosing these parameters entails non-technical work to define
which goals a given SNS should pursue.
For example, you can configure parameters that determine how much
voting rewards are distributed to users that participate in SNS 
governance and how often these rewards are distributed.
Choosing these parameters entails non-technical considerations,
such as deciding on a tokenomics plan that defines in what ways
the SNS tokens will be used and what behaviors should be incentiviced.

These examples show that before diving into the technical details, you 
may want to spend some time defining non-technical goals of the SNS you
are about to launch and the dapp that will be controlled by it.
To provide some tips on what considerations you should not forget,
we list a few of them on
[this page](../../../../tokenomics/sns/not-blind/predeployment-considerations.md).

### Step 2: Defining the parameters (technical preparation)
Once you have defined what (non-technical) goals the SNS should achieve,
you can tranlate them to parameters and configurations that can be set in
the SNS launch. 
To do this, it is useful to first understand on a high level how the
SNS launch proceeds.
We explain how the SNS launch works and how you can set the initialization
parameters for the SNS on [this page](./predeployment.md).

### Step 3: Testing the SNS
Once you chose the parameters, you probably do not want to immediately
go live without testing them. In fact, you may want to test different
initial parameters and compare them with each other.
Moreover, you might want to test the integration between the SNS canisters
and your dapp canister. For example, it is advisable that you
confirm that the dapp canisters can be upgraded by an SNS. 
Also, if you integrate parts of the frontend for the SNS into you dapp,
you probably want to test that this integration works.

For all these reasons, we explain on [this page](./local-testing.md), how
the SNS can be tested.

### Step 4: Launching the SNS in production
Once you properly tested the SNS, you are ready to launch an SNS in
production. 
We describe all steps included in this process in more detail
on [this page](./deployment.md).
