# Alternative Frontend Origins

If your application has reached the stage where you want to change domain names, and you have been authenticating with Internet Identity, you will want to make sure that your users can seamlessly keep the same Principals they have already been using. To support this functionality, you can configure your application for Alternative Frontend origins using this guide.

![End Result](../_attachments/alternative-origins.png)

You may need this guide if you are doing any of the following:

- Moving from `<canister-id>.ic0.app` to a custom domain
- Asking users to login at `/login` instead of `/`
- Supporting users using `raw.ic0.app`
- Configuring multiple apps in your organization to use the same principals
- And more

## Constraints

Currently, a maximum of **10** alternative origins can be listed.

II will only follow this specification when the origin configuring these alternatives is hosted on a canister using Certified Assets.

For more information, see the [Internet Identity Spec](https://github.com/dfinity/internet-identity/blob/main/docs/ii-spec.md#alternative-frontend-origins).

## Configuring Alternative Origins

For this example, we will have two domains, **A** and **B**. **A** will be the canonical origin, and **B** will be the alternative domain. To help illustrate this model, consider this website, which is hosted both at https://internetcomputer.org and https://hwvjt-wqaaa-aaaam-qadra-cai.ic0.app.

In this example, **A** would be the canister ID, or https://hwvjt-wqaaa-aaaam-qadra-cai.ic0.app.

**B** would be the alternative origin, or https://internetcomputer.org.

### Listing origins

For origin **A**, you will need to provide a file that tells Internet Identity that **B** is a valid origin. We'll be placing the config files in `src/assets` for this example. If your asset canister is currently configured to deploy assets from a `dist` folder, make sure to update the `sources` for your canister to include both:

```json
"source": [
    "dist",
    "src/assets"
]
```

Inside of `src/assets`, create a `.well-known` folder, and add a file named `ii-alternative-origins.`

:::note

The file needs to exactly be named `ii-alternative-origins`, with no file extension. The content inside will be formatted as JSON, but the file should not end with `.json`.

:::

Inside of the file, list your alternative origin for **B**. It will look something like this:

```json
{
  "alternativeOrigins": ["https://internetcomputer.org"]
}
```

:::note

Make sure that you remove any trailing slash or query parameters from the origin

:::

Now, your project should look something like this:

```
├── dfx.json
├── src
│   ├── assets
│   │   ├── .well-known
│   │   │   └── ii-alternative-origins
```

### Configuring Your Asset Canister

Because the dot syntax in `.well-known` ordinarily will be treated as "hidden" by the file system, the asset canister will need to be configured to upload your document. To configure the asset canister, create a new file, `.ic-assets.json`. `.ic-assets.json` needs to be placed inside a directory listed in `sources` for your canister, so we can use `src/assets` again. Your new list of files should look like this:

```
├── dfx.json
├── package.json
├── src
│   ├── assets
│   │   ├── .ic-assets.json
│   │   ├── .well-known
│   │   │   └── ii-alternative-origins
```

Then, configure the `.well-known` directory to be included, with

```json
[
  {
    "match": ".well-known",
    "ignore": false
  },
  {
    "match": ".well-known/ii-alternative-origins",
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    "ignore": false
  }
]
```

This includes a general rule to not ignore the `.well-known` directory, and rules to deliver the `ii-alternative-origins` with access control and content-type headers.

Then, all you need to do is deploy your canister. When you attempt to authenticate from origin **B** from then on, you will get back the same principal you get while using **A**.
