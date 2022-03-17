# Internet Computer Developer Portal

The developer portal bring together all the information needed for developers to start building on the Internet Computer.

## Contributing
The developer portal uses [Docusaurus](https://docusaurus.io/docs). 

Versionning has been set up so that the release process is simplified and automated. 
This repository therefore follows the [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) model. 

### Local development
While modifying the docs in the repository, you can preview the changes locally by executing the following commands.
```bash
cd portal/
npm install 
npm start
```

The development developer portal should appear in your browser under http://localhost:3000

To preview a specific locale in the context of an internationalization contribution, start the docs with the following command:

> 🚧 Internationalization has been disabled for now. TODO

```bash
npm start -- --locale <locale>
```

### Adding a document
Docusaurus is quite easy to use and facilitates the creation of documents. 
The developer portal uses Markdown as its default format. 

To create a document, go into the `/docs` folder and create a Markdown file in the directory of your choice.

In order to place the document correctly in the sidebar as well as having the correctly capitalized title, you have to respect a naming convention. 
The convention consists of having the position specified at the start of the name: `00-Name.md`.

Here are a few examples:

```
developer-docs/
    01-IC Overview.md
    02-Quick start.md
    03-Guides/
        ...
```

At the very top of the document, Docusaurus allows you to specify some parameters. 

The `slug` parameter is the only one **mandatory** for the developer portal. 
Here is an example for the file `01-IC Overview.md`.

```md
---
slug: ic-overview
---

Here is the content of the article
```

More information about document creation on [Docusaurus's docs](https://docusaurus.io/docs/create-doc). 

### Deployed Previews
Whenever you create a Pull Request on the repository, the [`CD Preview to Netlify`](https://github.com/dfinity/portal/actions/workflows/cd--preview-netlify.yml) job will appear. 
This job will build your branch and deploy it to Netlify in a temporary URL. 

At the very bottom of your pull request, you will see the list of deployments. 
Once the job is finished, you should see as active the "Preview Netlify" deployment. 

<img width="800" alt="Screenshot 2022-03-17 at 11 45 25" src="https://user-images.githubusercontent.com/15371828/158793201-bb41f003-3d8d-4f95-9f91-8798613bc695.png">

Then simply press the "View deployment" button to in your fresh Netlify preview.


### Contribution workflow
Here is a description of how a contribution should be made to the developer portal. 
1. The contributor creates a fork/branch where the changes are made. 
2. a Pull Request is created from this branch to `master`. the preview is generated and the reviewers can directly check the preview website.
3. the Pull Request is merged in `master` and sits in `current` until the next release. 
4. a tag is created which triggers a build pipeline uploading the new version and setting it as the latest one.
