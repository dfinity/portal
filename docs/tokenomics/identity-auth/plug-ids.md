# Plug's Internet Computer IDs 101
Learn the difference between Principal IDs, Canister IDs, .icp names, and Account IDs, and how Plug interacts with them in your wallet.

This is an adaptation of a [Medium article](https://medium.com/plugwallet/internet-computer-ids-101-669b192a2ace) written by the folks at [Plug wallet](https://plugwallet.ooo/).

When using Plug, you might find that other than using a Principal ID, you have to sometimes interact with other Internet Computer identifiers like… Canister IDs and Account IDs. For example, **if you send ICP to a Principal ID (normally not possible, but with Plug it is 😉) you will see that the recipient is an Account ID.**

The question on your mind is probably, “What are all these IDs? Didn’t I just need a Principal ID to use Plug?”. The answer is… Yes! Plug centers the experience around Principal IDs. But on the Internet Computer, **different elements (canisters, tokens, etc.) by default -unfortunately- require different IDs:**
- Account IDs for holding ICP
- Cycle Wallet IDs for holding Cycles
- Canister IDs for other canisters (ex. custom tokens)
- Principal IDs for owning & controlling canisters
- .icp Names as Unique Usernames with Multiple Address Records
Plug Unifies All of Those Under one Principal ID 📡

**As a Plug user, you get one Principal ID as your main wallet/identifier. Underneath the surface? All those other sub-IDs are handled behind the scenes creating a seamless user experience.**

Natively, Principal IDs can’t hold or receive tokens (ICP, Cycles, etc.), so you would need a **separate ID** that can hold them. In the case of ICP, it is an Account ID.
That creates a tricky experience for users on the Internet Computer. Unlike on Ethereum, where you have one address (ETH Address) that is both your identity and a wallet for all your tokens on the network, **on the IC you need to manage separate IDs/wallets for each token.**

Meaning, if you were to send one ICP and Cycles to someone, you would need different addresses for each, which are also different to that person’s main ID, a Principal ID! **Dizzy yet?**

**How does Plug solve this?**
By taking your identity and main ID on the IC, a Principal ID, and **combining it with all those other different addresses you need to control.** It’s kind of like when you add a new token to MetaMask, when you simply point to the token’s Smart Contract!
**In a nutshell,** when you send ICP to a Principal ID, Plug takes that ID and fetches the Account ID that the recipient owns and controls, and sends the ICP there. Like a router! In V1.0 we only do this for ICP, and as of V2.0 cycles will be added in, and custom tokens soon after.
**But… What are all these IDs actually for?** Let’s do a quick overview, from Principal IDs to Canister IDs and Account IDs. What do they do, and why would you need them (or not!) in Plug.

## What is a Principal ID? 🔒
**Principal IDs are the main unique identifiers on the Internet Computer.** Using Principal IDs you can create canisters, and authenticate yourself on Internet Computer apps & services. They are the only identifiers apps know from users, and **the only ID that can own canisters.**
They look like this:
    `55vo5-ubrtj-k5pze-e3gmi-5u5cq-i5gte-54n5s-dfo5h-ehrrm-erpra-zez`
In a nutshell, deploying canisters & identity. Pretty easy, right? Let’s move on to how this relates to Plug.

### How are Principal IDs used in Plug? 💭
In Plug, a Principal ID is your MAIN unique identity/wallet. When you create a wallet, you get a new Principal ID that represents it. Therefore any Plug user has one, and it is the main address you can see/copy on the top of Plug
In Plug, your Principal ID does the following:
It represents your wallet address.
It is linked to your different token IDs (Account ID, Cycle Wallet ID, etc..)
It can receive tokens from other Plug users.
It is recovered using a 12 word Secret Recovery Phrase.

### Okay… What about Canister IDs? 🤔
Canisters IDs are the unique identifiers that **represent a canister on the Internet Computer.**
They look similar to Principal IDs format wise, but shorter:
    `h5ert-waaaa-aaaab-qaamq-cai`
Any canister can receive cycles, or ICP (although at the moment you can’t withdraw ICP from canisters).
Remember Cycle Wallets? **They are canisters!** In a nutshell, **since Principal IDs can’t hold cycles,** the Internet Computer’s native solution to hold them is deploying a canister (Cycle Wallet) that has the sole purpose of acting as your wallet. Their address is also a Canister ID, though you might just call them a Cycle Wallet ID too.

### What can you do with Canister IDs in Plug? 🛢️
At the moment (Plug V1.0), there are no features in Plug that involve Canister IDs. These will be added in V2.0 when support for cycles is added to the wallet.
When that happens, you will be able to send cycles to a Canister ID, whether it is another person’s Cycle Wallet, or a canister on the network that you want to refill and power with cycles (canisters require cycles to run their software). We are considering allowing sending ICP to Canister IDs as well, but at the moment the Internet Computer has a limitation that doesn’t allow users to withdraw ICP from canisters.

## What’s an Account ID? 📒
Account IDs are asset-specific unique identifiers that, in the case of ICP, **represent a user’s balance in the ICP ledger** on the Internet Computer. That is the main difference between Account IDs and other IDs, they are asset-specific and only represent one token’s balance of a specific user.
**Account IDs are derived from a user’s Principal ID that controls that balance,** and that is why when you send ICP to a Principal ID, Plug can check what Account ID it needs to send it to.
When you create a wallet in Plug, an **Account ID is created based on your Principal ID,** meaning as a Plug user you hold a balance in the NNS ICP ledger from day 0.

### What can you do with Account IDs in Plug? 🔌
With Plug you have two options when sending ICP. You can either send to a Principal ID and let Plug check what Account ID is associated with it; or you can put the Account ID directly too.
What about depositing ICP to your account? The same concept applies. You can receive ICP to your main Principal ID if the sender is using Plug (or an app that supports sending ICP to Principal IDs directly); or you can receive ICP to your account ID, if the sender is using native Internet Computer tools that only support sending ICP to Account IDs.

## What is a .icp Name (ICNS)?
.icp names (e.g. “nico.icp”) are names provided by ICNS, the Internet Computer Name Service. ICNS maps human-readable names (.icp names — e.g. nico.icp) to crypto addresses and other types of records (e.g. your Principal ID, Account ID, BTC address, avatar, etc.).

That way, users can have one simple and easy-to-read name (“name.icp”) that can act as their unique username on the network, representing a ton of non-human readable addresses. Any app can simply read the .icp name’s records on ICNS and fetch the appropriate address for the given context.

You can simply share your “name.icp” with your friends, instead of a ton of long and strange addresses that are hard to remember (e.g. a Principal ID like “nscsj-65dff-fjwd2-wddcu-75ddc4–3u23q-hes6j-ji57j-7tvxt-yrxhh-qae”. If you transfer ICP to that name, it will resolve to the Account ID the owner set in its records; if you send an NFT or other token to that address, it will resolve to the Principal ID that name’s owner set in its records… And so on! [Learn more about them here](https://medium.com/psychedelic-dao/announcing-icns-is-joining-the-psychedelic-fam-7fecf340d449).

### What can you do with .icp names in Plug? 🔌
With Plug, you can send any token or NFT to .ICP names. Plug will automatically check the records behind that name on ICNS and figure out the appropriate destination address! You can save any .icp name as a contact as well.
Cheers! You’re an ID Wizard Now 🧙‍♂️
