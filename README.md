<img src="https://user-images.githubusercontent.com/15371828/158857061-8fa8d079-d33f-4ed2-88aa-56d452d238d8.svg" align="right" alt="DFINITY logo" width="270">

# Internet Computer Developer Portal

The Developer Portal brings together all the resources needed for experienced as well as beginning developers on the Internet Computer.

https://internetcomputer.org

[![Netlify Status](https://api.netlify.com/api/v1/badges/0ef9e793-aa30-446a-ae7a-a18ac304db58/deploy-status)](https://app.netlify.com/sites/icportal/deploys) [![CD](https://github.com/dfinity/portal/actions/workflows/cd.yml/badge.svg)](https://github.com/dfinity/portal/actions/workflows/cd.yml)

## Contributing

The Developer Portal uses [Docusaurus](https://docusaurus.io/docs).

### Local development

#### Requirements

- Node v16 (v18 not recommended)

#### Install and run locally

While modifying documentation in the repository, you can preview the changes locally by executing the following commands.

```bash
cd portal/
git submodule update --init
npm install
npm start
```

The Developer Portal frontend should appear in your browser under http://localhost:3000.

To preview a specific locale in the context of an internationalization contribution, start the docs with the following command:

```bash
npm start -- --locale <locale>
```

### Adding a document

Docusaurus is quite easy to use and facilitates the creation of documents.
The developer portal uses Markdown as its default format with [enhancements provided by Docusuaurus](https://docusaurus.io/docs/markdown-features).

To create a document, head to the `/docs` folder and create a Markdown file in the directory of your choice.

Here is an example of a docs sub-directory:

```
developer-docs/
    developer-docs/
        ic-overview.md
        quickstart/
            ...
    references/
        ...
```

### Changing the roadmap

The roadmap items are stored as markdown files inside the [roadmap](https://github.com/dfinity/portal/tree/master/roadmap) directory.

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
│   │   ├── 3_http-outcalls.md
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

- to change the title, links, or ETA of an item, edit the metadata section at the top of each markdown document
- to change the status of an item, eg. from `in-progress` to `deployed`, move the file to the `deployed` directory
- items are listed in alphabetical order of their filename, to enforce a certain ordering between items you can prefix the filenames with numbers
- to mark an item as a community request, set `is_community: true` in the item's metadata

Each domain folder contains an `index.md` file which adds metadata, like a title, a description, and cover images.

### Changing the How it works content

The how it works page cards and subpages are stored as markdown files inside the [how-it-works](https://github.com/dfinity/portal/tree/master/how-it-works) directory.

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

The `.card.md` files will show up as part of the /how-it-works page, under the section they are grouped in (eg. Featured).

The `.subpage.md` files will each generate a subpage under /how-it-works/, based on the files' metadata and content:

- the `slug` parameter will determine the final URL, eg. the slug `canister-lifecycle` will generate the page `/how-it-works/canister-lifecycle`.
- the `title`, `abstract` (optional), and `coverImage` will determine how the page looks when shared on social media

**How to embed youtube videos:**

You can embed youtube videos by adding the video's cover image, then turning the image into a link to the video itself, eg.

```
[![Watch youtube video](https://i.ytimg.com/vi/YWHTNr8RZHg/maxresdefault.jpg)](https://www.youtube.com/watch?v=YWHTNr8RZHg)
```

The page will automatically put the Youtube icon on the cover image, imitating an embedded video.

You can get the cover image of a video by substituting the video ID into the following URL:

```
https://i.ytimg.com/vi/INSERT_VIDEO_ID_HERE/0.jpg
```

If the resulting image is low quality, you can try `https://i.ytimg.com/vi/INSERT_VIDEO_ID_HERE/maxresdefault.jpg`, but it does not always exist.

### ⚠️ Contributions' musts:

- Making sure that the [`.github/CODEOWNERS`](https://github.com/dfinity/portal/blob/master/.github/CODEOWNERS) file is filled with new documents that you added. This way we can ensure that future Pull Requests are reviewed by the right people.
- When creating a document, it must be registered in [`/sidebars.js`](https://github.com/dfinity/portal/blob/master/sidebars.js), otherwise, it will not appear in the side navigation bar.

> More information about document creation on [Docusaurus's docs](https://docusaurus.io/docs/create-doc).

### Deployed Previews

Whenever a Pull Request is created on the repository, a CI job will appear and deploy a Preview on Netlify so that reviewers can easily check the changes made the way the end users will.

To access the preview, head to the very bottom of your pull request where you will see the list of deployments.
Once the job is finished, you should see as active the "Preview Netlify" deployment.

<img width="800" alt="Screenshot 2022-03-17 at 11 45 25" src="https://user-images.githubusercontent.com/15371828/158793201-bb41f003-3d8d-4f95-9f91-8798613bc695.png">

Then simply press the "View deployment" button to in your fresh Netlify preview.

### Contribution workflow

Here is a description of how a contribution should be made to the developer portal.

1. The contributor creates a fork/branch where the changes are made.
2. a Pull Request is created from this branch to `master`. the preview is generated and the reviewers can directly check the preview website.
3. After the Pull Request is merged into master, CI/CD will deploy the contents to the IC. The changes made will appear on the webpage under the version in the dropdown named "Current".
4. Optional: When a repo maintainer tags a commit on master as $TAG, then CI/CD deploys the contents to the IC. The webpage will default to the new "$TAG" version, visible in the versions dropdown, and allow users to view the contents pinned at that tag.

## Community-created Agents and CDKs

The [agents](https://internetcomputer.org/docs/current/developer-docs/build/agents) and [CDKs](https://internetcomputer.org/docs/current/developer-docs/build/cdks) sections should not only contain docs for DFINITY-created agents and CDKs.
We therefore invite other projects to:

- link to their own agents or CDKs on the respective index pages (the files to be edited are in `docs/developer-docs/build/agents/index.md` or `docs/developer-docs/build/cdks/index.md`)
- add their own documentation as a folder under `Agents` or `CDKs`

## Community-created Developer tools

We invite developers to add their IC-focused developer tools to the [Developer Tools page](https://internetcomputer.org/tooling) by appending an entry to the `communityToolingItems` array in `src/components/Common/toolingItems.ts`.

Please make sure to add appropriate tags to make the tool easy to discover for other devs. Avoid introducing new tags if possible.

## Community-created sample projects

You can submit your sample project to be displayed on the [Samples page](https://internetcomputer.org/samples).

Add your submission to [the community projects file](/community/communityProjects.ts) and open a pull request. You can use an editor with TypeScript support to make sure your submission follows [the schema](/src/components/Common/sampleItems.ts)
