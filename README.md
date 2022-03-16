# Internet Computer Developer Portal

The developer portal bring together all the information needed for developers to start building on the Internet Computer.

## Contributing
The developer portal uses [Docusaurus](https://docusaurus.io/docs). 

Versionning has been set up so that the release process is simplified and automated. 
This repository therefore follows the [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) model. 

### Contribution workflow
Here is a description of how a contribution should be made to the developer portal. 
1. The contributor creates a fork/branch where the changes are made. 
2. a Pull Request is created from this branch to `develop`. the preview is generated and the reviewers can directly check the preview website.
3. the Pull Request is merged in `develop` and sits here until the next release. 
4. once current `develop` changes have been approved they get merged in `master`.
5. a tag is created which triggers a build pipeline uploading the new version and setting it as the latest one.