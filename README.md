# Internet Computer Developer Portal
small change for preview
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

To create a document, go into the `/docs` folder and create a markdown file in the root directory or a folder.

At the very top of the document, Docusaurus allows you to specify some parameters. 
Here is an example of a Docusaurus header:
```md
---
id: greeting
title: Hello
---
```

More information about document creation on [Docusaurus's docs](https://docusaurus.io/docs/create-doc). 

### Contribution workflow
Here is a description of how a contribution should be made to the developer portal. 
1. The contributor creates a fork/branch where the changes are made. 
2. a Pull Request is created from this branch to `master`. the preview is generated and the reviewers can directly check the preview website.
3. the Pull Request is merged in `master` and sits in `current` until the next release. 
4. a tag is created which triggers a build pipeline uploading the new version and setting it as the latest one.
