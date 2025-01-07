<img src="https://user-images.githubusercontent.com/15371828/158857061-8fa8d079-d33f-4ed2-88aa-56d452d238d8.svg" alt="DFINITY logo" width="270">

# ICP developer portal

The ICP developer portal brings together all the resources needed for developers to build on the
Internet Computer. Primarily, this repo hosts the [ICP Developer Docs](https://internetcomputer.org/docs/current/home) but also includes the [Ecosystem Project Showcase](https://internetcomputer.org/ecosystem), [community tooling page](https://internetcomputer.org/tooling), and the internetcomputer.org ['How it works'](https://internetcomputer.org/how-it-works) series.

The ICP developer portal uses [Docusaurus](https://docusaurus.io/docs).

# Developer documentation

## Repo structure

```
docs
├── concepts
├── developer-docs
│   ├── backend // programming language documentation
│   │   ├── motoko
│   │   ├── rust
│   │   ├── python
│   │   ├── solidity
│   │   ├── typescript
│   ├── daos // NNS & SNS documentation
│   │   ├── nns
│   │   ├── sns
│   ├── defi // token and defi documentation
│   │   ├── asset-custody
│   │   ├── icp-tokens
│   │   ├── icrc-1
│   │   ├── nfts
│   │   ├── rosetta
│   ├── developer-tools // CLI tools, IDEs, CDKs, and agent documentation
│   │   ├── cli-tools
│   │   ├── ide
│   │   ├── off-chain
│   │   ├── on-chain
│   ├── getting-started // introductory onboarding documentation
│   │   ├── cycles
│   │   ├── deploy
│   │   ├── install
│   │   ├── quickstart
│   ├── multi-chain // multi-chain integration documentation
│   │   ├── bitcoin
│   │   ├── ethereum
│   ├── security
│   ├── smart-contracts // canister documentation
│   │   ├── advanced-features
│   │   ├── best-practices
│   │   ├── call
│   │   ├── candid
│   │   ├── deploy
│   │   ├── encryption
│   │   ├── maintain
│   │   ├── overview
│   │   ├── test
│   │   ├── topping-up
│   │   ├── write
│   ├── web-apps // frontend and web app documentation
│   │   ├── application-frontends
│   │   ├── browser-js
│   │   ├── custom-domains
│   │   ├── frameworks
│   │   ├── http-compatible-canisters
│   │   ├── user-login
├── motoko // Motoko documentation - submodule
├── references // reference documentation
├── samples // sample projects - submodule
├── tutorials // tutorial series (developer ladder, hackathon prep course, etc).
```

# Contributing to the Dev Docs

## Contributions must:

- Must follow the [developer docs style guide](style-guide.md).
- Must follow the [best practices and guidelines](#best-practices).
- Must include [document tags](#document-tags).
- Must include [SEO keywords](#seo-keywords).
- Must be in `.mdx` file format to support the previous two components.
- Must be registered in [`/sidebars.js`](https://github.com/dfinity/portal/blob/master/sidebars.js), otherwise, it will not appear in the
  side navigation bar.
- Make sure that the [`.github/CODEOWNERS`](https://github.com/dfinity/portal/blob/master/.github/CODEOWNERS) file is
  filled with new documents that you added. This way we can ensure that future Pull Requests are reviewed by the right people.

If proposed documentation additions do not follow the above guidelines, they will need to be revised.

Additionally, it is recommended to create a branch for changes, then submit a PR that compares the Master branch to your branch. This is because the GitHub preview canister can only generate live previews of the proposed changes from branches. It cannot create previews from forks or branches of forks.

## Adding a document

To add a new documentation page, first find the category on the sidebar that you'd like to create a new document under. Then, navigate into that subdirectory in the repo and create a new documentation page. See the [repo structure](#repo-structure) outline for more information.

All documents must be in `.mdx` format.

## Format, language choice, and capitalization
Avoid using the term ‘we’ in documentation. Either eliminate using pronouns or instead, use ‘your’.

- “Next, we will open the main.mo file.” → “Next, open the main.mo file.”

- “We need to download dfx before we get started.” → “You need to download dfx before you get started.”

Avoid marketing language and trying to 'sell' the feature. Explain the technology’s benefits in a manner that they should sell themselves to developers.

Follow the [Dev Docs Style Guide](style-guide.md) for guidance on:
- Page structure.
- Use of page headings.
- Use of capitalization.
- Language, spelling, grammar, and word choice.
- Use of punctuation.
- Bulleted lists.
- Bold text.
- Italic text.
- Hints.
- Links and hyperlinks.
- Code snippets and code blocks.
- Command line syntax.
- FAQ sections.

## Best practices

When writing documentation for the Dev Docs, the following guidelines should be followed:

### Audience

The intended audience of the Dev Docs are existing ICP devs and Web3 blockchain devs who are interested in developing on ICP after they have experience with Ethereum/Solidity, Solana, Bitcoin, etc.

As a more general guideline, the audience can be thought of as the ‘20-29 crypto community’.

This audience should be kept in mind when writing docs. For example:

- When introducing new concepts, tools, and ICP features, assume that the developer will need some additional context. You can provide additional context for other related concepts and features by linking to relevant documents or making mention that the feature builds off of concepts mentioned in another article, then link that article.

- If an ICP-specific term can be related to a broad blockchain concept, use that terminology where it makes sense. For example:

	- Smart contracts on ICP are referred to as canisters.
	- Accounts on ICP are referred to as principals.
	- Multi-chain applications on ICP use Chain Fusion capabilities.

- When introducing blockchain-specific concepts, it is not necessary to relate concepts to Web2 or traditional programming concepts. It can be assumed that the reader is familiar with blockchain terminology.

### Documentation types
The structure and content of the documentation page will vary based on the document type. Some common types are:

#### Feature or tool detail page
A page that details a specific tool or feature. Feature or tool pages should provide a deeper explanation of a specific feature or tool, why a developer should use it, and how they can use it. It should describe the currently implemented workflows the feature/tool supports, and should not include details of conceptual ideas that are not currently live for developers to use (future roadmap items, possible improvements in the future, etc.)

#### Concept
Concept pages describe in more detail a specific concept of ICP. Concept pages should relate to broad Web3 terms whenever possible (smart contracts to canisters, accounts to principals, etc.)
Concept pages should remain simple and high-level without providing unnecessary, in-depth details. Readers should be able to quickly understand the technology and its benefits, convincing them to continue learning more and begin developing using the technology.

#### Tutorial
A tutorial uses a step-by-step format to walk a user through a specific workflow. The Developer Ladder is an example of a tutorial series.

#### Reference
A reference page provides low level detail into a feature or technology. API reference pages are an example that provide in-depth detail about different endpoints and methods. Some examples include:

### Content
Link to resources that go into further detail and provide a brief summary of the concepts within the doc. Some places that may include further details may include additional information:

- The [reference technology overview](https://internetcomputer.org/docs/current/references/bitcoin-how-it-works) pages

- The [how it works](https://internetcomputer.org/how-it-works) section of the website

- The [core concepts](https://internetcomputer.org/docs/current/concepts/canisters-code) section of the docs

Try to answer the following questions within the document:

- What is the feature, tool, or concept?
- How do developers benefit from using it? Why should they care about it?
- How can developers use it?
- What dependencies do they need to download or import into their project to use it?
- Are there any best practices they should follow?
- What are the limitations? Are there any nuances they should be aware of?
- What resources or docs should they go to for more information?

### Duplication and redundancies
Avoid duplication of content whenever possible. If content exists elsewhere on the Dev Docs that explains the concept or feature you’d like to include, link to that page rather than re-explaining things.

Avoid using several sentences that say the same thing. Remove redundancies whenever possible.

### Code snippets
When inserting code snippets into a document, you may use full, deploy-ready snippets, or you can use small pieces of code to demonstrate a specific feature or function.

To determine which form suits the document best, answer the following:

- Does the document focus on a specific feature or functionality, or does it showcase an entire dapp/service?
- If the development showcases a specific feature, a partial snippet may be appropriate.
- Is implementation of this feature/functionality very complex? Does it require prerequisite knowledge?
- If the feature is fairly simple and doesn’t require much prerequisite knowledge, a small partial snippet can be used.
- Are the prerequisites for using this code available elsewhere in the documentation? Is it clear that these prerequisites should be followed prior to inserting this feature?

When in doubt, try to use full code snippets. This additional context can help limit confusion and aid in developer onboarding/developer adoption of new features.

### Simplicity
Keep content as brief and to-the-point as possible. Do not over-explain concepts. Try to use pointed sentences that do not contain ‘fluff’ words.

Keep in mind that developers want to find the answers to their questions as quickly as possible. Having long-winded explanations that they must decipher can prevent them from staying on the documentation and prevent them from onboarding.

For non-native English speakers, having long paragraphs with redundant sentences can cause confusion and onboarding friction.

### Language-agnosity
Avoid giving the impression that developers must learn and use Motoko to create canisters. When possible, provide code snippets in as many languages as possible. Use the [Docusaurus tab](#tabs) functionality to format these examples. Reach out to @jessiemongeon1 for questions/assistance with this.

For some documentation instances, this may not be possible, such as Rust crates and Motoko libraries.

### Visual aids
When introducing new protocol concepts or architecture, visual aids can be extremely beneficial for the reader. If possible, create a visual aid to help explain these new concepts.

[Excalidraw](https://excalidraw.com/) is a recommended tool for creating these visuals.

### Resources
At the end of the document, it can be beneficial to developers if you include links to additional resources. If a developer reads through the document and still has questions, where should they go?
This may include:
- Tutorials that showcase this feature.
- The Github repo for this feature or tool.
- Additional reading resources, such as a concepts page or a how it works page.

### Guidelines
When writing documentation, keep the following best practices in mind:

1. When linking other documents, avoid the format:
	- “Read more about dfx [here](link.com).”
Instead, use:
	- “[Learn more about dfx](link.com).”

2. Be brief. Cut out unnecessary words and sentences.
3. Follow the [style guide](style-guide.md) for formatting and language.
4. Avoid creating duplicate content. Link to existing content whenever possible.
5. Provide high-level overviews of technology and concepts. Avoid giving a deep-dive on different technologies.
6. Utilize visual aids when possible.
7. Utilize language-agnostic examples and code snippets.


## Document tags

Document tags are required for all documentation pages. They can be added beneath the title heading (# Title) of the page.

```
import { MarkdownChipRow } from "/src/components/Chip/MarkdownChipRow";

# Title

<MarkdownChipRow labels={["Beginner", "Motoko", "Tutorial"]} />
````

Documentation pages should include two types of keywords:

- Document skill level:

	- Beginner

	- Intermediate

	- Advanced

- Document type:

	- Concept

	- Tutorial

	- Getting started

	- Reference (Reference pages do not require a skill level tag)

Additional, optional (but recommended) tags include:

- Language

	- Motoko / Rust / Python / Typescript / Solidity

- Multi-chain integration

	- Bitcoin / Ethereum

- Governance (for NNS/SNS docs)

## SEO keywords

SEO keywords are required for all documentation pages. They can be added to the frontmatter of the document (first three lines) using the following format:

```
---
keywords: [intermediate, browser js, javascript, ICP JavaScript agent, agents]
---
```

Keywords must include the words included as document tags (experience level, document type) at minimum. Additional SEO keywords can be added at the author's discretion.

## Tabs

To showcase code snippets in several different languages, the Tabs functionality can be used. The Dev Docs uses a custom tab component that defines a 'Beta' badge that is used to label TypeScript and Python snippets as 'Beta'.

Here is an example of how to use this custom tab component:

	import TabItem from "@theme/TabItem";
	import { AdornedTabs } from "/src/components/Tabs/AdornedTabs";
	import { AdornedTab } from "/src/components/Tabs/AdornedTab";
	import { BetaChip } from "/src/components/Chip/BetaChip";

	<AdornedTabs groupId="language">
	<TabItem value="motoko" label="Motoko" default>

	```motoko

	Motoko code

	```

	</TabItem>
	<TabItem value="rust" label="Rust">

	```rust

	Rust code

	```

	</TabItem>

	<AdornedTab value={"typescript"} label="TypeScript" endAdornment={<BetaChip />}>

	```typescript

	TypeScript code

	```

	</AdornedTab>

	<AdornedTab value={"python"} label="Python" endAdornment={<BetaChip />}>

	```python

	Python code

	```

	</AdornedTab>
	</AdornedTabs>


## Tooltips

Tooltips are pieces of text, usually glossary keywords that display an info box when moused over. Tooltips are optional but recommended for content tagged as 'Beginner'.

To use tooltips, first import the necessary module:

```
import { GlossaryTooltip } from "/src/components/Tooltip/GlossaryTooltip";
```

Then, use the tooltip in line with the code:

```
I'm a <GlossaryTooltip>canister</GlossaryTooltip> deployed on ICP.
```

The word included within the `<GlossaryTooltip>` tags must be defined in the file `/static/glossary.txt` in the format:

```
word=definition.
```

Please make sure you put an `=` equal sign between the term and the definition, and keep each term + definition pair on a single line.

Failing to do so will break the code that auto-populates the Tooltip with the appropriate definition.

## Submodules

The developer docs utilize submodules for several subfolders of documentation. To edit these pages, changes must be made in the submodule's repo and merged into that repo. Then you must open a PR in this repo that pulls the latest submodule updates to apply the changes.

The following submoules and their corresponding repos are currently used:

- SDK
    - `/docs/current/developer-docs/developer-tools/cli-tools/cli-reference/`
    - GitHub Repo: https://github.com/dfinity/sdk.git

- Motoko
    - `/docs/current/motoko/main/base/`
    - GitHub Repo: https://github.com/dfinity/motoko.git

- quill
    - `/docs/current/developer-docs/developer-tools/cli-tools/quill`
    - GitHub Repo: https://github.com/dfinity/quill.git

- Internet Identity
    - `/docs/current/references/ii-spec`
	- GitHub Repo: https://github.com/dfinity/internet-identity.git

- Sample projects
    - `/docs/current/references/samples`
    - GitHub Repo: https://github.com/dfinity/examples.git
    - Note: This submodule intentionally uses `.md` files instead of `.mdx` files. Therefore, these pages do not support components such as tags and tooltips.

- dfxvm
    - `/docs/current/developer-docs/developer-tools/cli-tools/dfxvm/docs/cli-reference/dfx/`
    - GitHub Repo: https://github.com/dfinity/dfxvm.git

- Response verification
    - `/docs/current/developer-docs/web-apps/http-compatible-canisters/custom-http-canisters`
    - GitHub Repo: https://github.com/dfinity/response-verification

### Updating submodules

To update all submodules, run the command:

```
git submodule update --remote
```

### Reverting submodule changes

To revert submodule changes in a PR that did not intend to update submodules, run the commands:

```
git checkout master
git submodule update
git checkout <your branch>
git add * # especially submodules
```

### Embedding YouTube videos

You can embed YouTube videos by adding a piece of iframe code. Go to the Youtube video, click 'Share', then click 'Embed' and it will give you the entire `<iframe>` code that you can copy paste. An example can be found below:

```
<iframe width="560" height="315" src="https://www.youtube.com/embed/-se6Se9z-aM?si=cvwDyXYrSKgoBZ4_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
```

## Contribution workflow

Here is a description of how a contribution should be made to the developer portal:

1. The contributor creates a fork/branch where proposed changes are made.
2. A pull request (PR) is created from that branch/fork to `master`. A build preview is generated and the reviewers can directly check the preview website.
3. After the pull request is merged into `master`, CI/CD will deploy the contents to ICP. The changes made will appear on the website.

### Deployed previews

Whenever a Pull Request for a branch is created on the repository, a GitHub bot will comment on the PR with a preview link once one has been generated.

You can view the status of the preview build job by navigating to the bottom of the PR and viewing the 'Build deployment preview' job. If this job fails, the preview will not be shown. Any errors in the build must be resolved before the PR can be approved and merged.

## Deployment best practices

The portal repo uses git submodules to distribute content authoring across several repositories. This can prove
challenging if you want to make updates to docs that refer to stale content in other repos. Here are some best practices
that may prove helpful when contributing to `portal`.

1. Don't commit changes to `submodules`.
   a. Check your staged changes and see if any files are nested within the `submodules` directory. If so - revert them.
   Those changes must go into the corresponding submodule repository.
2. Be wary of the order of operations when it comes to submodules.
   a. If you do intend to make changes to content under `submodules`, the changes need to be merged into the respective
   repo first.
   b. Once the change has been merged, you will also need to update `portal`'s ref to that repo. You can do that by
   running `git submodule update --remote --merge`
3. Build locally.
   a. You can save yourself some headaches if you run `npm run build` locally before you push your changes. If the build
   fails locally, it will almost certainly fail in CI.
   b. Our CI requires that a set of checks pass before a PR can be merged. One of those checks is whether the code can be
   deployed to a canister. You do not need to deploy a canister locally, but at the very least `npm run build` should
   pass.

## Changing the roadmap

The roadmap items are stored as markdown files inside
the [roadmap](https://github.com/dfinity/portal/tree/master/roadmap) directory.

The items are grouped by domain and status.

```
roadmap
├── 1_core-protocol
│   ├── deployed
│   │   ├── network_performance.md
│   │   └── nodes_can_be_reassigned.md
│   ├── in-progress
│   │   ├── 1_btc-integration.md
│   │   ├── 2_tecdsa.md
│   │   ├── 3_https-outcalls.md
│   │   ├── 4_high-replication-subnets.md
│   │   └── 5_deterministic-time-slicing.md
│   ├── index.md
│   └── pending
│       └── eth-integration.md
├── 2_boundary_nodes
│   ├── deployed
│   │   └── icos-nodes.md
│   ├── in-progress
│   │   ├── 1_seo_and_streaming.md
│   │   ├── 2_asset_canister_caching.md
...
```

- To change the title, links, or ETA of an item, edit the metadata section at the top of each markdown document.
- To change the status of an item, eg. from `in-progress` to `deployed`, move the file to the `deployed` directory.
- Items are listed in alphabetical order of their filename, to enforce a certain ordering between items you can prefix
  the filenames with numbers.
- To mark an item as a community request, set `is_community: true` in the item's metadata.

Each domain folder contains an `index.md` file which adds metadata, like a title, a description, and cover images.

### Changing the 'how it works' content

The 'How it works' page cards and subpages are stored as markdown files inside
the [how-it-works](https://github.com/dfinity/portal/tree/master/how-it-works) directory.

```
how-it-works
├── 1_about
│   ├── 01-overview-of-the-internet-computer.card.md
│   ├── 01-overview-of-the-internet-computer.subpage.md
│   ├── canister-lifecycle.card.md
│   ├── canister-lifecycle.subpage.md
│   └── index.md
├── 2_featured
│   ├── direct-integration-with-bitcoin.card.md
│   ├── direct-integration-with-bitcoin.subpage.md
│   ├── index.md
│   ├── sns.card.md
│   ├── threshold-ecdsa-signing.card.md
│   ├── threshold-ecdsa-signing.subpage.md
```

The directory contains markdown files ending in `.card.md` and `.subpage.md`.

The `.card.md` files will show up as part of the `/how-it-works page`, under the section they are grouped in (eg.
Featured).

The `.subpage.md` files will each generate a subpage under `/how-it-works/`, based on the files' metadata and content:

- The `slug` parameter will determine the final URL, eg. the slug `canister-lifecycle` will generate the
  page `/how-it-works/canister-lifecycle`.
- The `title`, `abstract` (optional), and `coverImage` will determine how the page looks when shared on social media

## Adding documentation for community-created agents and CDKs

The [agents](https://internetcomputer.org/docs/current/developer-docs/build/agents)
and [CDKs](https://internetcomputer.org/docs/current/developer-docs/build/cdks) sections should not only contain docs
for DFINITY-created agents and CDKs.
We therefore invite other projects to:

- Link to their own agents or CDKs on the respective index pages (the files to be edited are
  in `docs/developer-docs/build/agents/index.md` or `docs/developer-docs/smart-contracts/write/overview.mdx`).
- Add their own documentation as a folder under `Agents` or `CDKs`.

## Adding community-created developer tools

We invite developers to add their ICP-focused developer tools to
the [developer tools page](https://internetcomputer.org/tooling) by appending an entry to the `communityToolingItems`
array in `src/components/Common/toolingItems.ts`.

Please make sure to add appropriate tags to make the tool easy to discover for other devs. Avoid introducing new tags if
possible.

## Community-created sample projects

You can submit your sample project to be displayed on the [samples page](https://internetcomputer.org/samples).

Add your submission to [the community projects file](/community/communityProjects.ts) and open a pull request. You can
use an editor with TypeScript support to make sure your submission
follows [the schema](/src/components/Common/sampleItems.ts).

### Showcase submission guidelines

_Disclaimer: You should have a working canister for your product to be showcased. Our team will review the PR and get
back to you for any further questions. In the meantime, please contact devcomms@dfinity.org if you have any questions._

Add your project to the end of [`showcase.json`](/showcase.json). Refer to the object schema below for the required
fields.

Make up a unique project id. For example, if your project is called `Awesome ICP Project!`, your project id could
be `awesome-icp-project`.

Your logo/video/screenshots files should be prefixed with your project id, and placed in the `/static/img/showcase`
folder. For example, if your project id is `awesome-icp-project`, your logo file should be
named `awesome-icp-project_logo.webp` and placed in the `/static/img/showcase` folder.

The [Ecosystem Helper](https://mvw4g-yiaaa-aaaam-abnva-cai.icp0.io/) is an onchain tool that helps you submit your project to internetcomputer.org. It helps with image conversion, resizing, previewing the project cards used throughout the website, and it produces a valid JSON document you can use. Fill out the form and download the asset bundle in a zip file.

### Asset guidelines

| Asset       |          | Requirements                    | Format                    | Notes                                                                                  |
|-------------|----------|---------------------------------|---------------------------|----------------------------------------------------------------------------------------|
| logo        | required | 112x112px (1:1 aspect ratio)    | svg(recommended)/png/webp | Optimize file size with [SVGOMG](https://svgomg.net) or [TinyPNG](https://tinypng.com) |
| screenshots | optional | 1024x576px                      | webp/jpg                  | The schema supports multiple files, but only the first one will be displayed           |
| video       | optional | max 10MB                        | webm/mp4                  | If there is a video file specified, it will be displayed instead of a screenshot.      |

### Tags

The list of tags is not final, and will be updated as the project evolves. For now, the following tags are available:

- `AI`
- `Chain Fusion`
- `Bitcoin`
- `Ethereum`
- `DAO`
- `DeFi`
- `Enterprise`
- `Gaming`
- `Metaverse`
- `NFT`
- `SocialFi`
- `Tools / Infrastructure`
- `Wallet`
- `Analytics`
- `Creator Economy`

### Object schema

```json
  {
    id: string,
    name: string,
    oneLiner: string, // short description of the project
    website: string, // URL starting with `https://`

    tags: ('AI' | 'Chain Fusion' | 'Bitcoin' | 'Ethereum' | 'DAO' | 'DeFi' | 'Enterprise' | 'Gaming' | 'Metaverse' | 'NFT' | 'SocialFi' | 'Tools / Infrastructure' | 'Wallet' | 'Analytics' | 'Creator Economy')[],
    description: string, // description of the project
    stats: string, // eg. "10,000 users"
    logo: string, // url to logo file, eg. /img/showcase/awesome-icp-project_logo.webp

    usesInternetIdentity: boolean,
    authOrigins?: string[]; // optional additional (URL) origins that can be utilized for signing in to your dapp

    github?: string, // full URL to github repo, if available
    youtube?: string, // full URL to a YouTube video or channel, if available
    twitter?: string, // full URL to a twitter account, if available

    screenshots?: string[], // optional array of urls to screenshot files

    video?: string, // optional url to video file, eg. /img/showcase/awesome-icp-project_video.webm
    videoContentType?: 'video/webm' | 'video/mp4', // to feed into the type attribute of the video/source element

    submittableId?: string, // optional id of the submittable form
  },
```

## Running a local development instance of this repo

### Requirements

- [Node v18](https://nodejs.org/en/blog/release/v18.17.0)

### Install and run locally

While modifying documentation in the repository, you can preview the changes locally by executing the following
commands.

```bash
cd portal/
git submodule update --init
npm ci
npm start
```

The developer portal frontend should appear in your browser under http://localhost:3000.

To preview a specific locale in the context of an internationalization contribution, start the docs with the following
command:

```bash
npm start -- --locale <locale>
```

## Generating a Reachability Report
Generate a report that collects all the stale hyperlinks that appear throughout internetcomputer.org by running the following command:

```shell
./.github/workflows/scripts/reachability-report.sh
```
