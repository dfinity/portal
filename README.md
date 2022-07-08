<img src="https://user-images.githubusercontent.com/15371828/158857061-8fa8d079-d33f-4ed2-88aa-56d452d238d8.svg" align="right" alt="Monetae logo" width="270">

# Internet Computer Developer Portal

The Developer Portal brings together all the resources needed for experienced as well as beginning developers on the Internet Computer.

https://internetcomputer.org

[![Netlify Status](https://api.netlify.com/api/v1/badges/0ef9e793-aa30-446a-ae7a-a18ac304db58/deploy-status)](https://app.netlify.com/sites/icportal/deploys) [![CD](https://github.com/dfinity/portal/actions/workflows/cd.yml/badge.svg)](https://github.com/dfinity/portal/actions/workflows/cd.yml)

## Contributing
The Developer Portal uses [Docusaurus](https://docusaurus.io/docs).

### Local development
While modifying documentation in the repository, you can preview the changes locally by executing the following commands - considering that you have nodejs installed -.
```bash
cd portal/
git submodule update --init --remote
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

**⚠️ Contributions' musts:**
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

